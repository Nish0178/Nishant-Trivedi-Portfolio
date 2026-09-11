package com.nishant.portfolio.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.LoginRequest;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.repository.AdminUserRepository;
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

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminAuthTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        adminUserRepository.deleteAll();
        AdminUser admin = new AdminUser("test-admin@example.com", passwordEncoder.encode("TestPassword123!"), "ADMIN");
        adminUserRepository.save(admin);
    }

    @Test
    @DisplayName("Admin Login with valid credentials returns 200 OK and JWT token")
    void testAdminLoginSuccess() throws Exception {
        LoginRequest request = new LoginRequest("test-admin@example.com", "TestPassword123!");

        mockMvc.perform(post("/api/admin/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.token").isString())
                .andExpect(jsonPath("$.user.email").value("test-admin@example.com"))
                .andExpect(jsonPath("$.user.role").value("ADMIN"));
    }

    @Test
    @DisplayName("Admin Login with invalid credentials returns 401 Unauthorized")
    void testAdminLoginFailure() throws Exception {
        LoginRequest request = new LoginRequest("test-admin@example.com", "WrongPassword!");

        mockMvc.perform(post("/api/admin/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    @DisplayName("Access to /api/admin/dashboard/stats without token returns 401 Unauthorized")
    void testUnauthorizedAdminAccessBlocked() throws Exception {
        mockMvc.perform(get("/api/admin/dashboard/stats")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.error").value("Unauthorized"));
    }

    @Test
    @DisplayName("Access to /api/admin/dashboard/stats with valid JWT Bearer token returns 200 OK")
    void testAuthorizedAdminAccessAllowed() throws Exception {
        String token = jwtService.generateToken("test-admin@example.com", "ADMIN");

        mockMvc.perform(get("/api/admin/dashboard/stats")
                        .header("Authorization", "Bearer " + token)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.backendStatus").value("UP"))
                .andExpect(jsonPath("$.totalProjects").isNumber());
    }
}
