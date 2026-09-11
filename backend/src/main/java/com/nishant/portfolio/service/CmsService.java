package com.nishant.portfolio.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
    public List<ProjectEntity> getAllAdminProjects() {
        return projectRepository.findAllByOrderBySortOrderAsc();
    }

    public List<ProjectEntity> getVisibleProjects() {
        return projectRepository.findAllByVisibleTrueOrderBySortOrderAsc();
    }

    public Optional<ProjectEntity> getProjectById(String id) {
        return projectRepository.findById(id);
    }

    @Transactional
    public ProjectEntity saveProject(ProjectEntity project) {
        if (project.getId() == null || project.getId().isBlank()) {
            project.setId(UUID.randomUUID().toString().substring(0, 8));
        }
        if (project.getCreatedAt() == null) {
            projectRepository.findById(project.getId()).ifPresentOrElse(
                    existing -> project.setCreatedAt(existing.getCreatedAt()),
                    () -> project.setCreatedAt(LocalDateTime.now())
            );
        }
        return projectRepository.save(project);
    }

    @Transactional
    public void deleteProject(String id) {
        projectRepository.deleteById(id);
    }

    /**
     * Unified Projects: Coexistence between DB-managed curated projects and GitHub-synced projects.
     * Prevents duplication of LaunchPilot AI / Launch-pilot.
     */
    public List<ProjectDto> getUnifiedProjects() {
        List<ProjectEntity> dbProjects = getVisibleProjects();
        List<ProjectDto> result = new ArrayList<>();
        Set<String> trackedNames = new HashSet<>();

        // 1. Convert DB projects to DTOs
        for (ProjectEntity entity : dbProjects) {
            ProjectDto dto = mapEntityToDto(entity);
            result.add(dto);
            if (entity.getName() != null) {
                trackedNames.add(entity.getName().toLowerCase());
            }
            if (entity.getTitle() != null) {
                trackedNames.add(entity.getTitle().toLowerCase());
            }
        }

        // 2. Fetch GitHub projects and append non-duplicated discovered repos
        try {
            List<ProjectDto> gitHubProjects = gitHubSyncService.getProjects();
            for (ProjectDto gp : gitHubProjects) {
                if (gp.isCurated()) {
                    continue; // Curated already handled from DB
                }
                String name = gp.getName() != null ? gp.getName().toLowerCase() : "";
                String title = gp.getTitle() != null ? gp.getTitle().toLowerCase() : "";

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
        dto.setLanguage(entity.getLanguage() != null ? entity.getLanguage() : "TypeScript");
        dto.setStargazersCount(entity.getStargazersCount());
        dto.setForksCount(entity.getForksCount());
        dto.setCategory(entity.getCategory() != null ? entity.getCategory() : "ENGINEERING PROJECT");
        dto.setStatus(entity.isCurated() ? "PRODUCTION READY" : "VERIFIED REPO");
        dto.setCurated(entity.isCurated());

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
