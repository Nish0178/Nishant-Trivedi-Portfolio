package com.nishant.portfolio.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.ProjectAdminDto;
import com.nishant.portfolio.dto.ProjectDto;
import com.nishant.portfolio.entity.*;
import com.nishant.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.*;

@Service
public class CmsService {

    private static final Logger log = LoggerFactory.getLogger(CmsService.class);

    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;
    private final EducationRepository educationRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final CmsSectionRepository cmsSectionRepository;
    private final ContactMessageRepository contactMessageRepository;
    private final GitHubSyncService gitHubSyncService;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public CmsService(
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            SkillRepository skillRepository,
            AchievementRepository achievementRepository,
            EducationRepository educationRepository,
            SocialLinkRepository socialLinkRepository,
            CmsSectionRepository cmsSectionRepository,
            ContactMessageRepository contactMessageRepository,
            GitHubSyncService gitHubSyncService
    ) {
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
        this.educationRepository = educationRepository;
        this.socialLinkRepository = socialLinkRepository;
        this.cmsSectionRepository = cmsSectionRepository;
        this.contactMessageRepository = contactMessageRepository;
        this.gitHubSyncService = gitHubSyncService;
    }

    // ==========================================
    // DASHBOARD STATS
    // ==========================================
    public Map<String, Object> getDashboardStats() {
        long totalProjects = projectRepository.count();
        long visibleProjects = projectRepository.countByVisibleTrue();
        long unreadMessages = contactMessageRepository.countByIsReadFalse();
        long totalExperiences = experienceRepository.count();
        long totalSkills = skillRepository.count();
        long totalAchievements = achievementRepository.count();

        return Map.of(
                "totalProjects", totalProjects,
                "visibleProjects", visibleProjects,
                "unreadMessages", unreadMessages,
                "experiencesCount", totalExperiences,
                "skillsCount", totalSkills,
                "achievementsCount", totalAchievements,
                "lastContentUpdate", LocalDateTime.now(),
                "backendStatus", "UP"
        );
    }

    // ==========================================
    // CMS SECTIONS (HERO, ABOUT, RESUME, SETTINGS)
    // ==========================================
    public Map<String, Object> getSectionData(String sectionKey) {
        return cmsSectionRepository.findBySectionKeyIgnoreCase(sectionKey)
                .map(sec -> {
                    try {
                        return objectMapper.readValue(sec.getContentJson(), new TypeReference<Map<String, Object>>() {});
                    } catch (Exception e) {
                        return Collections.<String, Object>emptyMap();
                    }
                })
                .orElse(Collections.emptyMap());
    }

    @Transactional
    public CmsSection updateSectionData(String sectionKey, Map<String, Object> data) {
        try {
            String json = objectMapper.writeValueAsString(data);
            CmsSection section = cmsSectionRepository.findBySectionKeyIgnoreCase(sectionKey)
                    .orElse(new CmsSection(sectionKey.toUpperCase(), json));
            section.setContentJson(json);
            section.setUpdatedAt(LocalDateTime.now());
            return cmsSectionRepository.save(section);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to serialize section data", e);
        }
    }

    // ==========================================
    // PROJECTS CRUD & UNIFIED COEXISTENCE
    // ==========================================
    public List<ProjectAdminDto> getAllAdminProjects() {
        return projectRepository.findAllByOrderBySortOrderAsc()
                .stream()
                .map(this::mapEntityToAdminDto)
                .toList();
    }

    public List<ProjectEntity> getVisibleProjects() {
        return projectRepository.findAllByVisibleTrueOrderBySortOrderAsc();
    }

    public Optional<ProjectAdminDto> getProjectById(String id) {
        return projectRepository.findById(id).map(this::mapEntityToAdminDto);
    }

    @Transactional
    public ProjectAdminDto saveProject(ProjectAdminDto dto) {
        if ((dto.getTitle() == null || dto.getTitle().isBlank()) &&
            (dto.getName() == null || dto.getName().isBlank())) {
            throw new IllegalArgumentException("Project title is required");
        }
        String title = (dto.getTitle() != null && !dto.getTitle().isBlank())
                ? dto.getTitle().trim()
                : dto.getName().trim();
        String name = (dto.getName() != null && !dto.getName().isBlank())
                ? dto.getName().trim()
                : title;
        String id = dto.getId();
        if (id == null || id.isBlank()) {
            id = title.toLowerCase().replaceAll("[^a-z0-9]+", "-").replaceAll("^-|-$", "");
            if (id.isBlank()) {
                id = UUID.randomUUID().toString().substring(0, 8);
            }
        }

        ProjectEntity entity = projectRepository.findById(id).orElse(new ProjectEntity());
        entity.setId(id);
        entity.setTitle(title);
        entity.setName(name);
        entity.setDescription(dto.getDescription() != null ? dto.getDescription().trim() : "");
        entity.setCategory(dto.getCategory() != null && !dto.getCategory().isBlank() ? dto.getCategory().trim() : "ENGINEERING PROJECT");
        entity.setTagline(dto.getTagline() != null ? dto.getTagline().trim() : null);
        entity.setGithubUrl(dto.getGithubUrl() != null && !dto.getGithubUrl().isBlank() ? dto.getGithubUrl().trim() : null);
        entity.setLiveUrl(dto.getLiveUrl() != null && !dto.getLiveUrl().isBlank() ? dto.getLiveUrl().trim() : null);
        entity.setImageUrl(dto.getImageUrl() != null && !dto.getImageUrl().isBlank() ? dto.getImageUrl().trim() : null);
        entity.setLanguage(dto.getLanguage() != null && !dto.getLanguage().isBlank() ? dto.getLanguage().trim() : "TypeScript");
        entity.setTechnologies(dto.getTechnologies() != null ? dto.getTechnologies().trim() : null);
        entity.setFeatures(dto.getFeatures() != null ? dto.getFeatures().trim() : null);
        entity.setStargazersCount(dto.getStargazersCount());
        entity.setForksCount(dto.getForksCount());
        entity.setFeatured(dto.isFeatured());
        entity.setVisible(dto.isVisible());
        entity.setSortOrder(dto.getSortOrder());
        entity.setCurated(dto.isCurated());

        LocalDateTime now = LocalDateTime.now();
        if (entity.getCreatedAt() == null) {
            entity.setCreatedAt(now);
        }
        entity.setUpdatedAt(now);

        ProjectEntity saved = projectRepository.save(entity);
        return mapEntityToAdminDto(saved);
    }

    @Transactional
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    public ProjectAdminDto mapEntityToAdminDto(ProjectEntity entity) {
        ProjectAdminDto dto = new ProjectAdminDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setName(entity.getName());
        dto.setDescription(entity.getDescription());
        dto.setCategory(entity.getCategory());
        dto.setTagline(entity.getTagline());
        dto.setGithubUrl(entity.getGithubUrl());
        dto.setLiveUrl(entity.getLiveUrl());
        dto.setImageUrl(entity.getImageUrl());
        dto.setLanguage(entity.getLanguage());
        dto.setTechnologies(entity.getTechnologies());
        dto.setFeatures(entity.getFeatures());
        dto.setStargazersCount(entity.getStargazersCount());
        dto.setForksCount(entity.getForksCount());
        dto.setFeatured(entity.isFeatured());
        dto.setVisible(entity.isVisible());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCurated(entity.isCurated());
        dto.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null);
        dto.setUpdatedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null);
        return dto;
    }

    /**
     * On-demand synchronization of GitHub repositories into PostgreSQL.
     * Prevents duplication of curated projects and preserves custom manually managed fields.
     */
    @Transactional
    public Map<String, Object> syncGitHubRepositories() {
        log.info("Starting on-demand GitHub repositories synchronization");
        List<ProjectEntity> allDbProjects = projectRepository.findAll();
        Map<String, ProjectEntity> projectsByRepoIdentifier = new HashMap<>();

        for (ProjectEntity pe : allDbProjects) {
            if (pe.getName() != null) {
                projectsByRepoIdentifier.put(pe.getName().trim().toLowerCase(), pe);
            }
            if (pe.getTitle() != null) {
                projectsByRepoIdentifier.put(pe.getTitle().trim().toLowerCase(), pe);
            }
            if (pe.getId() != null) {
                projectsByRepoIdentifier.put(pe.getId().trim().toLowerCase(), pe);
            }
            if (pe.getGithubUrl() != null && !pe.getGithubUrl().isBlank()) {
                String normalizedUrl = pe.getGithubUrl().trim().toLowerCase().replaceAll("/+$", "");
                int lastSlash = normalizedUrl.lastIndexOf('/');
                if (lastSlash >= 0) {
                    projectsByRepoIdentifier.put(normalizedUrl.substring(lastSlash + 1), pe);
                }
            }
        }

        int addedCount = 0;
        int updatedCount = 0;

        try {
            List<ProjectDto> gitHubProjects = gitHubSyncService.getProjects();
            int currentMaxSort = allDbProjects.stream().mapToInt(ProjectEntity::getSortOrder).max().orElse(0);

            for (ProjectDto gp : gitHubProjects) {
                if (gp.isCurated()) {
                    continue; // Curated already present and managed in DB
                }

                String repoNameKey = gp.getName() != null ? gp.getName().trim().toLowerCase() : "";
                ProjectEntity existing = projectsByRepoIdentifier.get(repoNameKey);

                if (existing != null) {
                    // Update ONLY GitHub-derived metrics; strictly PRESERVE custom description, features, image, sort order, featured, visible, etc.
                    existing.setStargazersCount(gp.getStargazersCount());
                    existing.setForksCount(gp.getForksCount());
                    if (existing.getLanguage() == null || existing.getLanguage().isBlank()) {
                        existing.setLanguage(gp.getLanguage());
                    }
                    if (existing.getGithubUrl() == null || existing.getGithubUrl().isBlank()) {
                        existing.setGithubUrl(gp.getHtmlUrl());
                    }
                    if ((existing.getLiveUrl() == null || existing.getLiveUrl().isBlank()) && gp.getHomepage() != null) {
                        existing.setLiveUrl(gp.getHomepage());
                    }
                    existing.setUpdatedAt(LocalDateTime.now());
                    projectRepository.save(existing);
                    updatedCount++;
                } else {
                    // Discovered new project from GitHub
                    ProjectEntity newEntity = new ProjectEntity();
                    newEntity.setId("github-" + (gp.getId() != null ? gp.getId() : repoNameKey));
                    newEntity.setName(gp.getName());
                    newEntity.setTitle(gp.getTitle() != null && !gp.getTitle().isBlank() ? gp.getTitle() : gp.getName());
                    newEntity.setDescription(gp.getDescription() != null ? gp.getDescription() : "Personal engineering repository on GitHub.");
                    newEntity.setCategory(gp.getCategory() != null ? gp.getCategory() : "DISCOVERED OPEN SOURCE");
                    newEntity.setTagline("Automated GitHub repository sync.");
                    newEntity.setGithubUrl(gp.getHtmlUrl());
                    newEntity.setLiveUrl(gp.getHomepage());
                    newEntity.setLanguage(gp.getLanguage() != null ? gp.getLanguage() : "TypeScript");
                    newEntity.setTechnologies(gp.getTech() != null && !gp.getTech().isEmpty()
                            ? String.join(", ", gp.getTech())
                            : (gp.getLanguage() != null ? gp.getLanguage() + ", Git, GitHub" : "Git, GitHub"));
                    newEntity.setFeatures(gp.getFeatures() != null && !gp.getFeatures().isEmpty()
                            ? String.join("\n", gp.getFeatures())
                            : "Public GitHub repository\nAutomated GitHub synchronization");
                    newEntity.setStargazersCount(gp.getStargazersCount());
                    newEntity.setForksCount(gp.getForksCount());
                    newEntity.setFeatured(false);
                    newEntity.setVisible(true);
                    newEntity.setCurated(false);
                    newEntity.setSortOrder(++currentMaxSort);
                    newEntity.setCreatedAt(LocalDateTime.now());
                    newEntity.setUpdatedAt(LocalDateTime.now());

                    projectRepository.save(newEntity);
                    projectsByRepoIdentifier.put(repoNameKey, newEntity);
                    addedCount++;
                }
            }
        } catch (Exception e) {
            log.error("GitHub repository synchronization failed: {}", e.getMessage(), e);
            throw new RuntimeException("Failed to synchronize GitHub repositories: " + e.getMessage(), e);
        }

        log.info("GitHub synchronization completed: {} new added, {} updated", addedCount, updatedCount);
        return Map.of(
                "success", true,
                "addedCount", addedCount,
                "updatedCount", updatedCount,
                "totalCount", projectRepository.count(),
                "message", String.format("GitHub sync completed: %d added, %d updated.", addedCount, updatedCount)
        );
    }

    /**
     * Unified Projects: Coexistence between DB-managed curated projects and GitHub-synced projects.
     * Prevents duplication of LaunchPilot AI / Launch-pilot.
     * Respects published state (visible=false) by tracking all known repository names in DB.
     */
    public List<ProjectDto> getUnifiedProjects() {
        List<ProjectEntity> allDbProjects = projectRepository.findAll();
        List<ProjectEntity> dbVisibleProjects = getVisibleProjects();
        List<ProjectDto> result = new ArrayList<>();
        Set<String> trackedNames = new HashSet<>();

        // Populate tracked names with ALL projects in DB (both visible and hidden)
        // so that unpublished (hidden) projects are not resurrected by dynamic GitHub fetching
        for (ProjectEntity pe : allDbProjects) {
            if (pe.getName() != null) {
                trackedNames.add(pe.getName().trim().toLowerCase());
            }
            if (pe.getTitle() != null) {
                trackedNames.add(pe.getTitle().trim().toLowerCase());
            }
            if (pe.getId() != null) {
                trackedNames.add(pe.getId().trim().toLowerCase());
            }
            if (pe.getGithubUrl() != null && !pe.getGithubUrl().isBlank()) {
                String normalizedUrl = pe.getGithubUrl().trim().toLowerCase().replaceAll("/+$", "");
                int lastSlash = normalizedUrl.lastIndexOf('/');
                if (lastSlash >= 0) {
                    trackedNames.add(normalizedUrl.substring(lastSlash + 1));
                }
            }
        }

        // 1. Convert visible DB projects to DTOs
        for (ProjectEntity entity : dbVisibleProjects) {
            ProjectDto dto = mapEntityToDto(entity);
            result.add(dto);
        }

        // 2. Fetch GitHub projects and append non-duplicated discovered repos
        try {
            List<ProjectDto> gitHubProjects = gitHubSyncService.getProjects();
            for (ProjectDto gp : gitHubProjects) {
                if (gp.isCurated()) {
                    continue; // Curated already handled from DB
                }
                String name = gp.getName() != null ? gp.getName().trim().toLowerCase() : "";
                String title = gp.getTitle() != null ? gp.getTitle().trim().toLowerCase() : "";

                if (!trackedNames.contains(name) && !trackedNames.contains(title)) {
                    result.add(gp);
                    trackedNames.add(name);
                }
            }
        } catch (Exception e) {
            log.warn("GitHub synchronization fallback used during project unification: {}", e.getMessage());
        }

        return result;
    }

    private ProjectDto mapEntityToDto(ProjectEntity entity) {
        ProjectDto dto = new ProjectDto();
        dto.setId(entity.getId());
        dto.setName(entity.getName());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setHtmlUrl(entity.getGithubUrl());
        dto.setHomepage(entity.getLiveUrl());
        dto.setImageUrl(entity.getImageUrl());
        dto.setLanguage(entity.getLanguage() != null ? entity.getLanguage() : "TypeScript");
        dto.setStargazersCount(entity.getStargazersCount());
        dto.setForksCount(entity.getForksCount());
        dto.setCategory(entity.getCategory() != null ? entity.getCategory() : "ENGINEERING PROJECT");
        dto.setTagline(entity.getTagline());
        dto.setStatus(entity.isCurated() ? "PRODUCTION READY" : "VERIFIED REPO");
        dto.setCurated(entity.isCurated());
        dto.setFeatured(entity.isFeatured());
        dto.setVisible(entity.isVisible());
        dto.setSortOrder(entity.getSortOrder());
        dto.setCreatedAt(entity.getCreatedAt() != null ? entity.getCreatedAt().toString() : null);
        dto.setUpdatedAt(entity.getUpdatedAt() != null ? entity.getUpdatedAt().toString() : null);

        // Parse technologies string
        if (entity.getTechnologies() != null) {
            String[] parts = entity.getTechnologies().split("[,\\n]+");
            List<String> list = new ArrayList<>();
            for (String p : parts) {
                if (!p.trim().isEmpty()) list.add(p.trim());
            }
            dto.setTech(list);
        } else {
            dto.setTech(List.of(dto.getLanguage(), "Git"));
        }

        // Parse features string
        if (entity.getFeatures() != null) {
            String[] parts = entity.getFeatures().split("[\\n]+");
            List<String> list = new ArrayList<>();
            for (String p : parts) {
                if (!p.trim().isEmpty()) list.add(p.trim());
            }
            dto.setFeatures(list);
        } else {
            dto.setFeatures(List.of("Verified engineering project"));
        }

        return dto;
    }

    // ==========================================
    // EXPERIENCES CRUD
    // ==========================================
    public List<ExperienceEntity> getAllExperiences(boolean onlyVisible) {
        return onlyVisible
                ? experienceRepository.findAllByVisibleTrueOrderBySortOrderAsc()
                : experienceRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public ExperienceEntity saveExperience(ExperienceEntity experience) {
        if (experience.getCreatedAt() == null && experience.getId() != null) {
            experienceRepository.findById(experience.getId()).ifPresentOrElse(
                    existing -> experience.setCreatedAt(existing.getCreatedAt()),
                    () -> experience.setCreatedAt(LocalDateTime.now())
            );
        } else if (experience.getCreatedAt() == null) {
            experience.setCreatedAt(LocalDateTime.now());
        }
        return experienceRepository.save(experience);
    }

    @Transactional
    public void deleteExperience(Long id) {
        experienceRepository.deleteById(id);
    }

    // ==========================================
    // SKILLS CRUD
    // ==========================================
    public List<SkillEntity> getAllSkills(boolean onlyVisible) {
        return onlyVisible
                ? skillRepository.findAllByVisibleTrueOrderBySortOrderAsc()
                : skillRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public SkillEntity saveSkill(SkillEntity skill) {
        if (skill.getCreatedAt() == null && skill.getId() != null) {
            skillRepository.findById(skill.getId()).ifPresentOrElse(
                    existing -> skill.setCreatedAt(existing.getCreatedAt()),
                    () -> skill.setCreatedAt(LocalDateTime.now())
            );
        } else if (skill.getCreatedAt() == null) {
            skill.setCreatedAt(LocalDateTime.now());
        }
        return skillRepository.save(skill);
    }

    @Transactional
    public void deleteSkill(Long id) {
        skillRepository.deleteById(id);
    }

    // ==========================================
    // ACHIEVEMENTS CRUD
    // ==========================================
    public List<AchievementEntity> getAllAchievements(boolean onlyVisible) {
        return onlyVisible
                ? achievementRepository.findAllByVisibleTrueOrderBySortOrderAsc()
                : achievementRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public AchievementEntity saveAchievement(AchievementEntity achievement) {
        if (achievement.getCreatedAt() == null && achievement.getId() != null) {
            achievementRepository.findById(achievement.getId()).ifPresentOrElse(
                    existing -> achievement.setCreatedAt(existing.getCreatedAt()),
                    () -> achievement.setCreatedAt(LocalDateTime.now())
            );
        } else if (achievement.getCreatedAt() == null) {
            achievement.setCreatedAt(LocalDateTime.now());
        }
        return achievementRepository.save(achievement);
    }

    @Transactional
    public void deleteAchievement(Long id) {
        achievementRepository.deleteById(id);
    }

    // ==========================================
    // EDUCATION CRUD
    // ==========================================
    public List<EducationEntity> getAllEducation(boolean onlyVisible) {
        return onlyVisible
                ? educationRepository.findAllByVisibleTrueOrderBySortOrderAsc()
                : educationRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public EducationEntity saveEducation(EducationEntity education) {
        if (education.getCreatedAt() == null && education.getId() != null) {
            educationRepository.findById(education.getId()).ifPresentOrElse(
                    existing -> education.setCreatedAt(existing.getCreatedAt()),
                    () -> education.setCreatedAt(LocalDateTime.now())
            );
        } else if (education.getCreatedAt() == null) {
            education.setCreatedAt(LocalDateTime.now());
        }
        return educationRepository.save(education);
    }

    @Transactional
    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }

    // ==========================================
    // SOCIAL LINKS CRUD
    // ==========================================
    public List<SocialLinkEntity> getAllSocials(boolean onlyVisible) {
        return onlyVisible
                ? socialLinkRepository.findAllByVisibleTrueOrderBySortOrderAsc()
                : socialLinkRepository.findAllByOrderBySortOrderAsc();
    }

    @Transactional
    public SocialLinkEntity saveSocial(SocialLinkEntity social) {
        if (social.getCreatedAt() == null && social.getId() != null) {
            socialLinkRepository.findById(social.getId()).ifPresentOrElse(
                    existing -> social.setCreatedAt(existing.getCreatedAt()),
                    () -> social.setCreatedAt(LocalDateTime.now())
            );
        } else if (social.getCreatedAt() == null) {
            social.setCreatedAt(LocalDateTime.now());
        }
        return socialLinkRepository.save(social);
    }

    @Transactional
    public void deleteSocial(Long id) {
        socialLinkRepository.deleteById(id);
    }

    // ==========================================
    // PUBLIC CONTENT AGGREGATOR
    // ==========================================
    public Map<String, Object> getAllPublicContent() {
        return Map.of(
                "hero", getSectionData("HERO"),
                "about", getSectionData("ABOUT"),
                "resume", getSectionData("RESUME"),
                "settings", getSectionData("SITE_SETTINGS"),
                "projects", getUnifiedProjects(),
                "skills", getAllSkills(true),
                "experiences", getAllExperiences(true),
                "achievements", getAllAchievements(true),
                "education", getAllEducation(true),
                "socials", getAllSocials(true)
        );
    }
}
