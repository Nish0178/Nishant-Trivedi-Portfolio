package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.entity.*;
import com.nishant.portfolio.repository.*;
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

import java.util.List;
import java.util.Map;

import static org.hamcrest.Matchers.*;
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
    private ExperienceRepository experienceRepository;

    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private AchievementRepository achievementRepository;

    @Autowired
    private EducationRepository educationRepository;

    @Autowired
    private SocialLinkRepository socialLinkRepository;

    @Autowired
    private CmsSectionRepository cmsSectionRepository;

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
    @DisplayName("Admin can update CMS Hero and About section data with authorization checks")
    void testProfileSectionsCrudAndAuth() throws Exception {
        // Unauthorized request without token fails with 401
        mockMvc.perform(get("/api/admin/content/hero"))
                .andExpect(status().isUnauthorized());

        mockMvc.perform(put("/api/admin/content/hero")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"bio\":\"Hacked bio\"}"))
                .andExpect(status().isUnauthorized());

        // Update Hero section with token
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

        // Read Hero section
        mockMvc.perform(get("/api/admin/content/hero")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.headlineLine1").value("ARCHITECTING"));

        // Update About section with token
        Map<String, Object> aboutUpdate = Map.of(
                "title", "SYSTEMS ARCHITECT & RESEARCHER",
                "bioParagraph1", "First principles engineering bio.",
                "bioParagraph2", "Distributed systems and applied AI.",
                "stats", List.of(
                        Map.of("number", "500+", "label", "ALGORITHMS", "subtext", "Java Verified", "highlight", true)
                )
        );

        mockMvc.perform(put("/api/admin/content/about")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(aboutUpdate)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.section").value("ABOUT"));

        // Read About section
        mockMvc.perform(get("/api/admin/content/about")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("SYSTEMS ARCHITECT & RESEARCHER"));
    }

    @Test
    @DisplayName("Admin Experience CRUD and authorization enforcement")
    void testExperienceCrudAndAuth() throws Exception {
        // 1. Unauthorized checks -> 401
        mockMvc.perform(get("/api/admin/experiences"))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(post("/api/admin/experiences")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"company\":\"Acme\"}"))
                .andExpect(status().isUnauthorized());

        // 2. Create Experience
        ExperienceEntity exp = new ExperienceEntity();
        exp.setCompany("Vance Core Systems");
        exp.setRole("Systems Engineering Intern");
        exp.setPeriod("Jan 2026 - Present");
        exp.setLocation("Remote");
        exp.setType("Internship");
        exp.setContributions("Designed distributed transaction pipeline\nOptimized query response by 35%");
        exp.setTechnologies("Java, Spring Boot, PostgreSQL, Docker");
        exp.setSortOrder(1);
        exp.setVisible(true);

        String createRes = mockMvc.perform(post("/api/admin/experiences")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(exp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.company").value("Vance Core Systems"))
                .andReturn().getResponse().getContentAsString();

        Long createdId = objectMapper.readTree(createRes).get("id").asLong();

        // 3. Read All Experiences
        mockMvc.perform(get("/api/admin/experiences")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));

        // 4. Update Experience
        exp.setId(createdId);
        exp.setRole("Lead Systems Engineer");
        mockMvc.perform(put("/api/admin/experiences/" + createdId)
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(exp)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.role").value("Lead Systems Engineer"));

        // 5. Delete Experience
        mockMvc.perform(delete("/api/admin/experiences/" + createdId)
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Admin Skills CRUD and authorization enforcement")
    void testSkillsCrudAndAuth() throws Exception {
        // 1. Unauthorized checks -> 401
        mockMvc.perform(get("/api/admin/skills"))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(post("/api/admin/skills")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Rust\"}"))
                .andExpect(status().isUnauthorized());

        // 2. Create Skill
        SkillEntity skill = new SkillEntity();
        skill.setCategory("Distributed Systems");
        skill.setName("Apache Kafka");
        skill.setRoleDesc("Event Streaming & PubSub Architecture");
        skill.setSortOrder(1);
        skill.setVisible(true);

        String createRes = mockMvc.perform(post("/api/admin/skills")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(skill)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.name").value("Apache Kafka"))
                .andReturn().getResponse().getContentAsString();

        Long skillId = objectMapper.readTree(createRes).get("id").asLong();

        // 3. Read Skills
        mockMvc.perform(get("/api/admin/skills")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));

        // 4. Update Skill
        skill.setId(skillId);
        skill.setName("Apache Kafka / Event Streams");
        mockMvc.perform(put("/api/admin/skills/" + skillId)
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(skill)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Apache Kafka / Event Streams"));

        // 5. Delete Skill
        mockMvc.perform(delete("/api/admin/skills/" + skillId)
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Admin Achievements CRUD and authorization enforcement")
    void testAchievementsCrudAndAuth() throws Exception {
        // 1. Unauthorized checks -> 401
        mockMvc.perform(get("/api/admin/achievements"))
                .andExpect(status().isUnauthorized());
        mockMvc.perform(post("/api/admin/achievements")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\":\"Award\"}"))
                .andExpect(status().isUnauthorized());

        // 2. Create Achievement
        AchievementEntity ach = new AchievementEntity();
        ach.setTitle("Grand Prix Systems Winner");
        ach.setBadge("1ST PLACE");
        ach.setIssuerOrVenue("Global Cloud Computing Hackathon 2026");
        ach.setYear("2026");
        ach.setDescription("Built autonomous fault-tolerant consensus state machine.");
        ach.setSortOrder(1);
        ach.setVisible(true);

        String createRes = mockMvc.perform(post("/api/admin/achievements")
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ach)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").exists())
                .andExpect(jsonPath("$.title").value("Grand Prix Systems Winner"))
                .andReturn().getResponse().getContentAsString();

        Long achId = objectMapper.readTree(createRes).get("id").asLong();

        // 3. Read Achievements
        mockMvc.perform(get("/api/admin/achievements")
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))));

        // 4. Update Achievement
        ach.setId(achId);
        ach.setBadge("CHAMPION");
        mockMvc.perform(put("/api/admin/achievements/" + achId)
                        .header("Authorization", "Bearer " + validToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(ach)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.badge").value("CHAMPION"));

        // 5. Delete Achievement
        mockMvc.perform(delete("/api/admin/achievements/" + achId)
                        .header("Authorization", "Bearer " + validToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    @DisplayName("Public Content Aggregator /api/content/all is accessible without auth")
    void testPublicContentAggregatorEndpoint() throws Exception {
        mockMvc.perform(get("/api/content/all"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.hero").exists())
                .andExpect(jsonPath("$.about").exists())
                .andExpect(jsonPath("$.projects").isArray())
                .andExpect(jsonPath("$.skills").isArray())
                .andExpect(jsonPath("$.experiences").isArray())
                .andExpect(jsonPath("$.achievements").isArray())
                .andExpect(jsonPath("$.education").isArray())
                .andExpect(jsonPath("$.socials").isArray());
    }
}
