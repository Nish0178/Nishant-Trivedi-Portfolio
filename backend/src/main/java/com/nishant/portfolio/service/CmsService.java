package com.nishant.portfolio.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.ProfileDto;
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
                if (pe.getId().toLowerCase().startsWith("github-")) {
                    projectsByRepoIdentifier.put(pe.getId().substring(7).trim().toLowerCase(), pe);
                }
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
            List<ProjectDto> gitHubProjects = gitHubSyncService.getProjects(true);
            int currentMaxSort = allDbProjects.stream().mapToInt(ProjectEntity::getSortOrder).max().orElse(0);

            for (ProjectDto gp : gitHubProjects) {
                String repoNameKey = gp.getName() != null ? gp.getName().trim().toLowerCase() : "";
                ProjectEntity existing = projectsByRepoIdentifier.get(repoNameKey);
                if (existing == null && gp.getId() != null) {
                    existing = projectsByRepoIdentifier.get(gp.getId().trim().toLowerCase());
                }

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
                } else if (!gp.isCurated()) {
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
        if (experience.getCompany() == null || experience.getCompany().isBlank()) {
            throw new IllegalArgumentException("Company name is required");
        }
        if (experience.getRole() == null || experience.getRole().isBlank()) {
            throw new IllegalArgumentException("Role is required");
        }

        validateExperienceDateRange(experience.getStartDate(), experience.getEndDate(), experience.getCurrent());
        experience.syncPeriod();
        if (experience.getPeriod() == null || experience.getPeriod().isBlank()) {
            experience.setPeriod("Present");
        }

        if (experience.getCreatedAt() == null && experience.getId() != null) {
            experienceRepository.findById(experience.getId()).ifPresentOrElse(
                    existing -> experience.setCreatedAt(existing.getCreatedAt()),
                    () -> experience.setCreatedAt(LocalDateTime.now())
            );
        } else if (experience.getCreatedAt() == null) {
            experience.setCreatedAt(LocalDateTime.now());
        }
        experience.setUpdatedAt(LocalDateTime.now());
        return experienceRepository.save(experience);
    }

    private void validateExperienceDateRange(String startDate, String endDate, Boolean current) {
        if (Boolean.TRUE.equals(current)) {
            return;
        }
        if (startDate == null || startDate.isBlank() || endDate == null || endDate.isBlank()) {
            return;
        }

        String sTrim = startDate.trim();
        String eTrim = endDate.trim();

        // ISO pattern comparison YYYY-MM or YYYY-MM-DD
        if (sTrim.matches("^\\d{4}(-\\d{2})?(-\\d{2})?$") && eTrim.matches("^\\d{4}(-\\d{2})?(-\\d{2})?$")) {
            if (sTrim.compareTo(eTrim) > 0) {
                throw new IllegalArgumentException("Start date cannot be after end date");
            }
        }

        // Year extraction & comparison
        java.util.regex.Pattern yearPattern = java.util.regex.Pattern.compile("\\b(19\\d\\d|20\\d\\d)\\b");
        java.util.regex.Matcher startMatcher = yearPattern.matcher(sTrim);
        java.util.regex.Matcher endMatcher = yearPattern.matcher(eTrim);

        if (startMatcher.find() && endMatcher.find()) {
            int startYear = Integer.parseInt(startMatcher.group(1));
            int endYear = Integer.parseInt(endMatcher.group(1));
            if (startYear > endYear) {
                throw new IllegalArgumentException("Start date year (" + startYear + ") cannot be after end date year (" + endYear + ")");
            }

            if (startYear == endYear) {
                List<String> months = List.of("jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec");
                int startMonth = -1, endMonth = -1;
                String sLower = sTrim.toLowerCase();
                String eLower = eTrim.toLowerCase();
                for (int i = 0; i < months.size(); i++) {
                    if (sLower.contains(months.get(i))) startMonth = i;
                    if (eLower.contains(months.get(i))) endMonth = i;
                }
                if (startMonth != -1 && endMonth != -1 && startMonth > endMonth) {
                    throw new IllegalArgumentException("Start month cannot be after end month in the same year");
                }
            }
        }
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
    // ==========================================
    // UNIFIED PROFILE CMS
    // ==========================================
    public ProfileDto getProfileData() {
        Map<String, Object> settings = getSectionData("SITE_SETTINGS");
        Map<String, Object> about = getSectionData("ABOUT");
        Map<String, Object> hero = getSectionData("HERO");
        Map<String, Object> resume = getSectionData("RESUME");
        List<SocialLinkEntity> socials = getAllSocials(false);

        ProfileDto dto = new ProfileDto();

        // 1. Name & Headline
        String name = (String) settings.getOrDefault("authorName", null);
        if (name == null || name.isBlank()) {
            name = (String) hero.getOrDefault("badgeName", "Nishant Trivedi");
            if ("NISHANT".equalsIgnoreCase(name)) {
                name = "Nishant Trivedi";
            }
        }
        dto.setName(name);

        String headline = "Software Engineer · Full-Stack · Systems · AI Workflows";
        if (hero.containsKey("subRoles") && hero.get("subRoles") instanceof List<?> list && !list.isEmpty()) {
            headline = String.join(" · ", list.stream().map(Object::toString).toList());
        } else if (settings.containsKey("siteTitle")) {
            headline = (String) settings.get("siteTitle");
        }
        dto.setHeadline(headline);

        // 2. Bio
        String bio = (String) about.getOrDefault("bioParagraph1",
                (String) hero.getOrDefault("bio", "Software engineer building products, systems, and AI-powered experiences across the full stack."));
        dto.setBio(bio);

        // 3. Email, Phone, Location
        dto.setEmail((String) settings.getOrDefault("email", "trivedinishant880@gmail.com"));
        dto.setPhone((String) settings.getOrDefault("phone", ""));
        dto.setLocation((String) settings.getOrDefault("location", "Lucknow, Uttar Pradesh, India (IST UTC +05:30)"));

        // 4. Resume URL
        dto.setResumeUrl((String) resume.getOrDefault("fileUrl", "/resume/Nishant_Trivedi_Resume.pdf"));

        // 5. Social Links
        for (SocialLinkEntity s : socials) {
            String platform = s.getPlatform() != null ? s.getPlatform().toLowerCase() : "";
            if (platform.contains("github")) dto.setGithub(s.getUrl());
            else if (platform.contains("linkedin")) dto.setLinkedin(s.getUrl());
            else if (platform.contains("instagram")) dto.setInstagram(s.getUrl());
            else if (platform.contains("leetcode")) dto.setLeetcode(s.getUrl());
            else if (platform.contains("hackerrank")) dto.setHackerrank(s.getUrl());
        }
        if (dto.getGithub() == null) dto.setGithub("https://github.com/Nish0178");
        if (dto.getLinkedin() == null) dto.setLinkedin("https://www.linkedin.com/in/nishant-trivedi-363ba3249");
        if (dto.getInstagram() == null) dto.setInstagram("https://www.instagram.com/nishant_trivedi.2111/");
        if (dto.getLeetcode() == null) dto.setLeetcode("https://leetcode.com/u/Nishant_trivedi01111/");
        if (dto.getHackerrank() == null) dto.setHackerrank("https://www.hackerrank.com/profile/trivedinishant81");

        dto.setUpdatedAt(LocalDateTime.now().toString());
        return dto;
    }

    @Transactional
    public ProfileDto updateProfileData(ProfileDto dto) {
        if (dto.getName() == null || dto.getName().isBlank()) {
            throw new IllegalArgumentException("Profile name cannot be blank");
        }
        if (dto.getEmail() == null || dto.getEmail().isBlank()) {
            throw new IllegalArgumentException("Profile email cannot be blank");
        }

        // 1. Update SITE_SETTINGS
        Map<String, Object> settings = new HashMap<>(getSectionData("SITE_SETTINGS"));
        settings.put("authorName", dto.getName().trim());
        settings.put("email", dto.getEmail().trim());
        if (dto.getLocation() != null) settings.put("location", dto.getLocation().trim());
        if (dto.getPhone() != null) settings.put("phone", dto.getPhone().trim());
        if (dto.getHeadline() != null) settings.put("siteTitle", dto.getName().trim() + " — " + dto.getHeadline().trim());
        updateSectionData("SITE_SETTINGS", settings);

        // 2. Update HERO
        Map<String, Object> hero = new HashMap<>(getSectionData("HERO"));
        hero.put("badgeName", dto.getName().trim());
        if (dto.getBio() != null) hero.put("bio", dto.getBio().trim());
        if (dto.getHeadline() != null && !dto.getHeadline().isBlank()) {
            String[] roles = dto.getHeadline().split("[·,|]+");
            List<String> subRoles = Arrays.stream(roles).map(String::trim).filter(s -> !s.isEmpty()).toList();
            if (!subRoles.isEmpty()) {
                hero.put("subRoles", subRoles);
            }
        }
        updateSectionData("HERO", hero);

        // 3. Update ABOUT
        Map<String, Object> about = new HashMap<>(getSectionData("ABOUT"));
        if (dto.getBio() != null) about.put("bioParagraph1", dto.getBio().trim());
        if (dto.getHeadline() != null) about.put("title", dto.getHeadline().trim().toUpperCase());
        updateSectionData("ABOUT", about);

        // 4. Update RESUME
        if (dto.getResumeUrl() != null && !dto.getResumeUrl().isBlank()) {
            Map<String, Object> resume = new HashMap<>(getSectionData("RESUME"));
            resume.put("fileUrl", dto.getResumeUrl().trim());
            updateSectionData("RESUME", resume);
        }

        // 5. Update/Upsert Social Links
        updateOrInsertSocial("GitHub", dto.getGithub(), "github", 1);
        updateOrInsertSocial("LinkedIn", dto.getLinkedin(), "linkedin", 2);
        updateOrInsertSocial("LeetCode", dto.getLeetcode(), "code", 3);
        updateOrInsertSocial("Instagram", dto.getInstagram(), "instagram", 4);
        updateOrInsertSocial("HackerRank", dto.getHackerrank(), "terminal", 5);

        return getProfileData();
    }

    private void updateOrInsertSocial(String platform, String url, String icon, int defaultSortOrder) {
        if (url == null || url.isBlank()) return;
        List<SocialLinkEntity> all = socialLinkRepository.findAll();
        Optional<SocialLinkEntity> found = all.stream()
                .filter(s -> s.getPlatform() != null && s.getPlatform().equalsIgnoreCase(platform))
                .findFirst();

        if (found.isPresent()) {
            SocialLinkEntity entity = found.get();
            entity.setUrl(url.trim());
            entity.setUpdatedAt(LocalDateTime.now());
            socialLinkRepository.save(entity);
        } else {
            SocialLinkEntity newSocial = new SocialLinkEntity();
            newSocial.setPlatform(platform);
            newSocial.setUrl(url.trim());
            newSocial.setIcon(icon);
            newSocial.setSortOrder(defaultSortOrder);
            newSocial.setVisible(true);
            newSocial.setCreatedAt(LocalDateTime.now());
            newSocial.setUpdatedAt(LocalDateTime.now());
            socialLinkRepository.save(newSocial);
        }
    }

    // ==========================================
    // PUBLIC CONTENT AGGREGATOR
    // ==========================================
    public Map<String, Object> getAllPublicContent() {
        Map<String, Object> content = new HashMap<>();
        content.put("hero", getSectionData("HERO"));
        content.put("about", getSectionData("ABOUT"));
        content.put("resume", getSectionData("RESUME"));
        content.put("settings", getSectionData("SITE_SETTINGS"));
        content.put("projects", getUnifiedProjects());
        content.put("skills", getAllSkills(true));
        content.put("experiences", getAllExperiences(true));
        content.put("achievements", getAllAchievements(true));
        content.put("education", getAllEducation(true));
        content.put("socials", getAllSocials(true));
        content.put("profile", getProfileData());
        return content;
    }
}
