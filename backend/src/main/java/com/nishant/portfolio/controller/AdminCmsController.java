package com.nishant.portfolio.controller;

import com.nishant.portfolio.entity.*;
import com.nishant.portfolio.service.CmsService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminCmsController {

    private final CmsService cmsService;

    public AdminCmsController(CmsService cmsService) {
        this.cmsService = cmsService;
    }

    // ==========================================
    // DASHBOARD STATS
    // ==========================================
    @GetMapping("/dashboard/stats")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        return ResponseEntity.ok(cmsService.getDashboardStats());
    }

    // ==========================================
    // SECTION MANAGEMENT (HERO, ABOUT, RESUME, SETTINGS)
    // ==========================================
    @GetMapping("/content/{section}")
    public ResponseEntity<Map<String, Object>> getSection(@PathVariable String section) {
        return ResponseEntity.ok(cmsService.getSectionData(section.toUpperCase()));
    }

    @PutMapping("/content/{section}")
    public ResponseEntity<?> updateSection(
            @PathVariable String section,
            @RequestBody Map<String, Object> data
    ) {
        CmsSection updated = cmsService.updateSectionData(section.toUpperCase(), data);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "section", updated.getSectionKey(),
                "updatedAt", updated.getUpdatedAt()
        ));
    }

    // ==========================================
    // PROJECTS MANAGEMENT
    // ==========================================
    @GetMapping("/projects")
    public ResponseEntity<List<ProjectEntity>> getAllProjects() {
        return ResponseEntity.ok(cmsService.getAllAdminProjects());
    }

    @PostMapping("/projects")
    public ResponseEntity<ProjectEntity> createProject(@RequestBody ProjectEntity project) {
        ProjectEntity created = cmsService.saveProject(project);
        return ResponseEntity.ok(created);
    }

    @PutMapping("/projects/{id}")
    public ResponseEntity<ProjectEntity> updateProject(
            @PathVariable String id,
            @RequestBody ProjectEntity project
    ) {
        project.setId(id);
        ProjectEntity updated = cmsService.saveProject(project);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/projects/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable String id) {
        cmsService.deleteProject(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }

    // ==========================================
    // EXPERIENCES MANAGEMENT
    // ==========================================
    @GetMapping("/experiences")
    public ResponseEntity<List<ExperienceEntity>> getAllExperiences() {
        return ResponseEntity.ok(cmsService.getAllExperiences(false));
    }

    @PostMapping("/experiences")
    public ResponseEntity<ExperienceEntity> createExperience(@RequestBody ExperienceEntity exp) {
        return ResponseEntity.ok(cmsService.saveExperience(exp));
    }

    @PutMapping("/experiences/{id}")
    public ResponseEntity<ExperienceEntity> updateExperience(
            @PathVariable Long id,
            @RequestBody ExperienceEntity exp
    ) {
        exp.setId(id);
        return ResponseEntity.ok(cmsService.saveExperience(exp));
    }

    @DeleteMapping("/experiences/{id}")
    public ResponseEntity<?> deleteExperience(@PathVariable Long id) {
        cmsService.deleteExperience(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }

    // ==========================================
    // SKILLS MANAGEMENT
    // ==========================================
    @GetMapping("/skills")
    public ResponseEntity<List<SkillEntity>> getAllSkills() {
        return ResponseEntity.ok(cmsService.getAllSkills(false));
    }

    @PostMapping("/skills")
    public ResponseEntity<SkillEntity> createSkill(@RequestBody SkillEntity skill) {
        return ResponseEntity.ok(cmsService.saveSkill(skill));
    }

    @PutMapping("/skills/{id}")
    public ResponseEntity<SkillEntity> updateSkill(
            @PathVariable Long id,
            @RequestBody SkillEntity skill
    ) {
        skill.setId(id);
        return ResponseEntity.ok(cmsService.saveSkill(skill));
    }

    @DeleteMapping("/skills/{id}")
    public ResponseEntity<?> deleteSkill(@PathVariable Long id) {
        cmsService.deleteSkill(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }

    // ==========================================
    // ACHIEVEMENTS MANAGEMENT
    // ==========================================
    @GetMapping("/achievements")
    public ResponseEntity<List<AchievementEntity>> getAllAchievements() {
        return ResponseEntity.ok(cmsService.getAllAchievements(false));
    }

    @PostMapping("/achievements")
    public ResponseEntity<AchievementEntity> createAchievement(@RequestBody AchievementEntity ach) {
        return ResponseEntity.ok(cmsService.saveAchievement(ach));
    }

    @PutMapping("/achievements/{id}")
    public ResponseEntity<AchievementEntity> updateAchievement(
            @PathVariable Long id,
            @RequestBody AchievementEntity ach
    ) {
        ach.setId(id);
        return ResponseEntity.ok(cmsService.saveAchievement(ach));
    }

    @DeleteMapping("/achievements/{id}")
    public ResponseEntity<?> deleteAchievement(@PathVariable Long id) {
        cmsService.deleteAchievement(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }

    // ==========================================
    // EDUCATION MANAGEMENT
    // ==========================================
    @GetMapping("/education")
    public ResponseEntity<List<EducationEntity>> getAllEducation() {
        return ResponseEntity.ok(cmsService.getAllEducation(false));
    }

    @PostMapping("/education")
    public ResponseEntity<EducationEntity> createEducation(@RequestBody EducationEntity edu) {
        return ResponseEntity.ok(cmsService.saveEducation(edu));
    }

    @PutMapping("/education/{id}")
    public ResponseEntity<EducationEntity> updateEducation(
            @PathVariable Long id,
            @RequestBody EducationEntity edu
    ) {
        edu.setId(id);
        return ResponseEntity.ok(cmsService.saveEducation(edu));
    }

    @DeleteMapping("/education/{id}")
    public ResponseEntity<?> deleteEducation(@PathVariable Long id) {
        cmsService.deleteEducation(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }

    // ==========================================
    // SOCIAL LINKS MANAGEMENT
    // ==========================================
    @GetMapping("/socials")
    public ResponseEntity<List<SocialLinkEntity>> getAllSocials() {
        return ResponseEntity.ok(cmsService.getAllSocials(false));
    }

    @PostMapping("/socials")
    public ResponseEntity<SocialLinkEntity> createSocial(@RequestBody SocialLinkEntity soc) {
        return ResponseEntity.ok(cmsService.saveSocial(soc));
    }

    @PutMapping("/socials/{id}")
    public ResponseEntity<SocialLinkEntity> updateSocial(
            @PathVariable Long id,
            @RequestBody SocialLinkEntity soc
    ) {
        soc.setId(id);
        return ResponseEntity.ok(cmsService.saveSocial(soc));
    }

    @DeleteMapping("/socials/{id}")
    public ResponseEntity<?> deleteSocial(@PathVariable Long id) {
        cmsService.deleteSocial(id);
        return ResponseEntity.ok(Map.of("success", true, "deletedId", id));
    }
}
