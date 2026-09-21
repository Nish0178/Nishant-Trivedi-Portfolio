package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.ProjectAdminDto;
import com.nishant.portfolio.dto.ProjectDto;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.entity.ProjectEntity;
import com.nishant.portfolio.repository.AdminUserRepository;
import com.nishant.portfolio.repository.ProjectRepository;
import com.nishant.portfolio.security.JwtService;
import com.nishant.portfolio.service.CmsService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CmsService cmsService;

    private String validToken;

    @BeforeEach
    void setUp() {
        adminUserRepository.deleteAll();
        AdminUser admin = new AdminUser("test-admin@example.com", passwordEncoder.encode("TestPassword123!"), "ADMIN");
        adminUserRepository.save(admin);
        validToken = jwtService.generateToken("test-admin@example.com", "ADMIN");
    }

    @Test
    @DisplayName("Admin Projects endpoints require authentication")
    void testSecurityEnforcement() throws Exception {
        // GET /api/admin/projects -> 401
        mockMvc.perform(get("/api/admin/projects"))
                .andExpect(status().isUnauthorized());

        // POST /api/admin/projects -> 401
        mockMvc.perform(post("/api/admin/projects")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Test\"}"))
                .andExpect(status().isUnauthorized());

        // PUT /api/admin/projects/test -> 401
        mockMvc.perform(put("/api/admin/projects/test")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Test\"}"))
                .andExpect(status().isUnauthorized());

        // DELETE /api/admin/projects/test -> 401
        mockMvc.perform(delete("/api/admin/projects/test"))
                .andExpect(status().isUnauthorized());

        // POST /api/admin/projects/sync-github -> 401
        mockMvc.perform(post("/api/admin/projects/sync-github"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("POST /api/admin/projects validates required title")
    void testCreateProjectValidation() throws Exception {
        ProjectAdminDto invalidProject = new ProjectAdminDto();
        invalidProject.setTitle("   ");
        invalidProject.setName("");

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidProject)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("POST /api/admin/projects creates and persists project using DTO")
    void testCreateProjectWithDto() throws Exception {
        ProjectAdminDto project = new ProjectAdminDto();
        project.setId("hyperion-engine");
        project.setTitle("Hyperion Engine");
        project.setName("hyperion-engine");
        project.setDescription("High-performance telemetry stream processing engine.");
        project.setCategory("DISTRIBUTED SYSTEMS");
        project.setGithubUrl("https://github.com/Nish0178/hyperion-engine");
        project.setLiveUrl("https://hyperion.nishanttrivedi.com");
        project.setImageUrl("https://assets.nishanttrivedi.com/images/hyperion.webp");
        project.setLanguage("Java");
        project.setTechnologies("Java 21, Spring Boot, Kafka, PostgreSQL");
        project.setFeatures("Sub-millisecond stream aggregation\nFault-tolerant clustering");
        project.setFeatured(true);
        project.setVisible(true);
        project.setSortOrder(5);
        project.setCurated(true);

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(project)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("hyperion-engine"))
                .andExpect(jsonPath("$.title").value("Hyperion Engine"))
                .andExpect(jsonPath("$.imageUrl").value("https://assets.nishanttrivedi.com/images/hyperion.webp"))
                .andExpect(jsonPath("$.featured").value(true))
                .andExpect(jsonPath("$.visible").value(true))
                .andExpect(jsonPath("$.sortOrder").value(5));

        ProjectEntity persisted = projectRepository.findById("hyperion-engine").orElseThrow();
        assertEquals("Hyperion Engine", persisted.getTitle());
        assertEquals("https://assets.nishanttrivedi.com/images/hyperion.webp", persisted.getImageUrl());
        assertTrue(persisted.isFeatured());
        assertTrue(persisted.isVisible());
        assertEquals(5, persisted.getSortOrder());

        // Cleanup
        projectRepository.deleteById("hyperion-engine");
    }

    @Test
    @DisplayName("PUT /api/admin/projects/{id} updates existing project")
    void testUpdateProjectWithDto() throws Exception {
        ProjectEntity initial = new ProjectEntity();
        initial.setId("test-update-proj");
        initial.setTitle("Original Title");
        initial.setName("test-update-proj");
        initial.setDescription("Original description");
        initial.setSortOrder(10);
        initial.setVisible(true);
        initial.setFeatured(false);
        projectRepository.save(initial);

        ProjectAdminDto updateDto = new ProjectAdminDto();
        updateDto.setId("test-update-proj");
        updateDto.setTitle("Updated Title");
        updateDto.setName("test-update-proj");
        updateDto.setDescription("Updated description text.");
        updateDto.setSortOrder(3);
        updateDto.setVisible(false); // Toggle published OFF
        updateDto.setFeatured(true); // Toggle featured ON

        mockMvc.perform(put("/api/admin/projects/test-update-proj")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateDto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Title"))
                .andExpect(jsonPath("$.sortOrder").value(3))
                .andExpect(jsonPath("$.visible").value(false))
                .andExpect(jsonPath("$.featured").value(true));

        ProjectEntity updated = projectRepository.findById("test-update-proj").orElseThrow();
        assertEquals("Updated Title", updated.getTitle());
        assertEquals(3, updated.getSortOrder());
        assertFalse(updated.isVisible());
        assertTrue(updated.isFeatured());

        // Cleanup
        projectRepository.deleteById("test-update-proj");
    }

    @Test
    @DisplayName("DELETE /api/admin/projects/{id} removes project from database")
    void testDeleteProject() throws Exception {
        ProjectEntity toDelete = new ProjectEntity();
        toDelete.setId("delete-me-proj");
        toDelete.setTitle("To Delete");
        toDelete.setName("delete-me-proj");
        toDelete.setDescription("Temporary project for deletion test.");
        projectRepository.save(toDelete);

        mockMvc.perform(delete("/api/admin/projects/delete-me-proj")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.deletedId").value("delete-me-proj"));

        assertFalse(projectRepository.existsById("delete-me-proj"));
    }

    @Test
    @DisplayName("GET /api/admin/projects returns list of ProjectAdminDto")
    void testGetAllAdminProjects() throws Exception {
        mockMvc.perform(get("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", isA(List.class)))
                .andExpect(jsonPath("$[0].title").exists())
                .andExpect(jsonPath("$[0].sortOrder").exists());
    }

    @Test
    @DisplayName("POST /api/admin/projects/sync-github executes sync and preserves curated data")
    void testGitHubSyncPreservesCuratedFields() throws Exception {
        ProjectEntity curated = projectRepository.findById("launchpilot-ai").orElseGet(() -> {
            ProjectEntity p = new ProjectEntity();
            p.setId("launchpilot-ai");
            p.setTitle("LaunchPilot AI");
            p.setName("Launch-pilot");
            p.setDescription("Custom curated description for LaunchPilot AI.");
            p.setCategory("FLAGSHIP // MULTIMODAL AI");
            p.setFeatures("Custom curated feature 1\nCustom curated feature 2");
            p.setTechnologies("Next.js 15, TypeScript, Gemini 2.5 Flash");
            p.setFeatured(true);
            p.setVisible(true);
            p.setCurated(true);
            p.setSortOrder(1);
            return projectRepository.save(p);
        });

        String originalDescription = curated.getDescription();
        String originalFeatures = curated.getFeatures();

        // Perform GitHub Sync
        mockMvc.perform(post("/api/admin/projects/sync-github")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").exists());

        // Verify curated project was NOT overwritten with raw GitHub info
        ProjectEntity afterSync = projectRepository.findById("launchpilot-ai").orElseThrow();
        assertEquals(originalDescription, afterSync.getDescription(), "Custom description must be preserved");
        assertEquals(originalFeatures, afterSync.getFeatures(), "Custom features must be preserved");
        assertTrue(afterSync.isCurated(), "Curated flag must remain true");
        assertTrue(afterSync.isFeatured(), "Featured flag must remain true");
    }

    @Test
    @DisplayName("Unpublished (hidden) project is not returned in public getUnifiedProjects")
    void testUnpublishedProjectNotLeakedInPublic() {
        ProjectEntity hidden = new ProjectEntity();
        hidden.setId("hidden-secret-proj");
        hidden.setTitle("Hidden Secret Project");
        hidden.setName("hidden-secret-proj");
        hidden.setDescription("Should not be visible publicly.");
        hidden.setVisible(false); // Hidden!
        hidden.setSortOrder(99);
        projectRepository.save(hidden);

        List<ProjectDto> publicProjects = cmsService.getUnifiedProjects();
        boolean found = publicProjects.stream()
                .anyMatch(p -> "hidden-secret-proj".equalsIgnoreCase(p.getId()) || "Hidden Secret Project".equalsIgnoreCase(p.getTitle()));

        assertFalse(found, "Unpublished projects must NOT appear in public getUnifiedProjects");

        // Cleanup
        projectRepository.deleteById("hidden-secret-proj");
    }

    @Test
    @DisplayName("ProjectDto guarantees dual field normalization and CMS properties")
    void testDtoNormalizationContract() {
        ProjectDto dto = new ProjectDto();
        dto.setName("norm-test");
        dto.setTitle("Normalization Test");
        dto.setLanguage("Rust");
        dto.setTech(List.of("Rust", "Tokio"));
        dto.setStargazersCount(15);
        dto.setForksCount(4);
        dto.setFeatured(true);
        dto.setVisible(true);
        dto.setSortOrder(2);
        dto.setTagline("Rust High Perf");

        // Verification of contract
        assertEquals("Normalization Test", dto.getDisplayTitle());
        assertEquals("Normalization Test", dto.getTitle());
        assertEquals(List.of("Rust", "Tokio"), dto.getTechnologies());
        assertEquals(List.of("Rust", "Tokio"), dto.getTech());
        assertEquals(15, dto.getStars());
        assertEquals(15, dto.getStargazersCount());
        assertEquals(4, dto.getForks());
        assertEquals(4, dto.getForksCount());
        assertTrue(dto.isFeatured());
        assertTrue(dto.isVisible());
        assertEquals(2, dto.getSortOrder());
        assertEquals("Rust High Perf", dto.getTagline());
    }
}
