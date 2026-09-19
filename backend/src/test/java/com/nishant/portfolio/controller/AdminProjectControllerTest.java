package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
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
import java.util.Map;

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
        ProjectEntity invalidProject = new ProjectEntity();
        invalidProject.setTitle("   ");
        invalidProject.setName("");

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(invalidProject)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Project title is required"));
    }

    @Test
    @DisplayName("POST /api/admin/projects creates and persists project with imageUrl")
    void testCreateProjectWithImageUrl() throws Exception {
        ProjectEntity project = new ProjectEntity();
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
                .andExpect(jsonPath("$.featured").value(true));

        ProjectEntity persisted = projectRepository.findById("hyperion-engine").orElseThrow();
        assertEquals("Hyperion Engine", persisted.getTitle());
        assertEquals("https://assets.nishanttrivedi.com/images/hyperion.webp", persisted.getImageUrl());
        assertTrue(persisted.isFeatured());
        assertTrue(persisted.isVisible());

        // Cleanup
        projectRepository.deleteById("hyperion-engine");
    }

    @Test
    @DisplayName("POST /api/admin/projects/sync-github executes sync and preserves curated data")
    void testGitHubSyncPreservesCuratedFields() throws Exception {
        // Ensure curated project exists with custom fields
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
    @DisplayName("ProjectDto guarantees dual field normalization (tech & technologies, title & displayTitle)")
    void testDtoNormalizationContract() {
        ProjectEntity entity = new ProjectEntity();
        entity.setId("norm-test");
        entity.setTitle("Normalization Test");
        entity.setName("norm-test");
        entity.setDescription("Testing DTO dual-property serialization.");
        entity.setLanguage("Rust");
        entity.setTechnologies("Rust, Tokio, Actix");
        entity.setStargazersCount(15);
        entity.setForksCount(4);

        List<ProjectDto> unified = cmsService.getUnifiedProjects();
        assertNotNull(unified);

        ProjectDto dto = new ProjectDto();
        dto.setName("norm-test");
        dto.setTitle("Normalization Test");
        dto.setLanguage("Rust");
        dto.setTech(List.of("Rust", "Tokio"));
        dto.setStargazersCount(15);
        dto.setForksCount(4);

        // Verification of contract
        assertEquals("Normalization Test", dto.getDisplayTitle());
        assertEquals("Normalization Test", dto.getTitle());
        assertEquals(List.of("Rust", "Tokio"), dto.getTechnologies());
        assertEquals(List.of("Rust", "Tokio"), dto.getTech());
        assertEquals(15, dto.getStars());
        assertEquals(15, dto.getStargazersCount());
        assertEquals(4, dto.getForks());
        assertEquals(4, dto.getForksCount());
    }
}
