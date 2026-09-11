package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.entity.ProjectEntity;
import com.nishant.portfolio.repository.AdminUserRepository;
import com.nishant.portfolio.repository.ProjectRepository;
import com.nishant.portfolio.security.JwtService;
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

import java.util.Map;

import static org.hamcrest.Matchers.greaterThanOrEqualTo;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminCmsControllerTest {

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

    private String validToken;

    @BeforeEach
    void setUp() {
        adminUserRepository.deleteAll();
        AdminUser admin = new AdminUser("test-admin@example.com", passwordEncoder.encode("TestPassword123!"), "ADMIN");
        adminUserRepository.save(admin);
        validToken = jwtService.generateToken("test-admin@example.com", "ADMIN");
    }

    @Test
    @DisplayName("Admin can create, read, update, and delete projects via CMS API")
    void testProjectLifecycle() throws Exception {
        // 1. Create project
        ProjectEntity newProject = new ProjectEntity();
        newProject.setId("test-proj-01");
        newProject.setTitle("Test Quantum Project");
        newProject.setName("test-quantum");
        newProject.setDescription("Quantum distributed computing simulation engine.");
        newProject.setCategory("SYSTEMS // AI");
        newProject.setGithubUrl("https://github.com/Nish0178/test-quantum");
        newProject.setLiveUrl("https://test-quantum.example.com");
        newProject.setTechnologies("Java, Spring, Quantum Sim");
        newProject.setFeatures("High concurrency\nStateless processing");
        newProject.setFeatured(true);
        newProject.setVisible(true);
        newProject.setSortOrder(10);
        newProject.setCurated(false);

        mockMvc.perform(post("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newProject)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("test-proj-01"))
                .andExpect(jsonPath("$.title").value("Test Quantum Project"));

        // 2. Read projects
        mockMvc.perform(get("/api/admin/projects")
                        .header("Authorization", "Bearer " + validToken)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", greaterThanOrEqualTo(1)));

        // 3. Update project
        newProject.setTitle("Updated Quantum Project v2");
        mockMvc.perform(put("/api/admin/projects/test-proj-01")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(newProject)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Quantum Project v2"));

        // 4. Delete project
        mockMvc.perform(delete("/api/admin/projects/test-proj-01")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Admin can update CMS Hero section data")
    void testUpdateHeroSection() throws Exception {
        Map<String, Object> heroUpdate = Map.of(
                "headlineLine1", "ARCHITECTING",
                "headlineLine2", "ROBUST",
                "headlineLine3", "SYSTEMS",
                "bio", "Updated engineering bio via CMS."
        );

        mockMvc.perform(put("/api/admin/content/hero")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(heroUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.section").value("HERO"));
    }
}
