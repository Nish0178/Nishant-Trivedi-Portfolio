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

    @Autowired
    private com.nishant.portfolio.service.LoginAttemptService loginAttemptService;

    @BeforeEach
    void setUp() {
        loginAttemptService.clearAll();
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
    @DisplayName("Admin Login with invalid credentials tracks 3 attempts and blocks 4th with lockout")
    void testAdminLoginThreeAttemptsAndLockout() throws Exception {
        LoginRequest badRequest = new LoginRequest("test-admin@example.com", "WrongPassword!");

        // Attempt 1
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.100"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.remainingAttempts").value(2))
                .andExpect(jsonPath("$.locked").value(false))
                .andExpect(jsonPath("$.message").value("Invalid credentials. 2 attempts remaining."));

        // Attempt 2
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.100"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.remainingAttempts").value(1))
                .andExpect(jsonPath("$.locked").value(false))
                .andExpect(jsonPath("$.message").value("Invalid credentials. 1 attempt remaining."));

        // Attempt 3 (lockout triggered)
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.100"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.status").value(401))
                .andExpect(jsonPath("$.remainingAttempts").value(0))
                .andExpect(jsonPath("$.locked").value(true))
                .andExpect(jsonPath("$.message").value("Sorry, you have failed 3 login attempts. I think you are not the admin of this profile. Please contact the admin."));

        // Attempt 4 while locked out returns 429 Too Many Requests
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.100"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isTooManyRequests())
                .andExpect(jsonPath("$.status").value(429))
                .andExpect(jsonPath("$.remainingAttempts").value(0))
                .andExpect(jsonPath("$.locked").value(true))
                .andExpect(jsonPath("$.message").value("Sorry, you have failed 3 login attempts. I think you are not the admin of this profile. Please contact the admin."));
    }

    @Test
    @DisplayName("Successful login clears failed attempt count")
    void testSuccessfulLoginResetsAttemptCount() throws Exception {
        LoginRequest badRequest = new LoginRequest("test-admin@example.com", "WrongPassword!");
        LoginRequest goodRequest = new LoginRequest("test-admin@example.com", "TestPassword123!");

        // 1 failure
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.200"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.remainingAttempts").value(2));

        // Successful login
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.200"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(goodRequest)))
                .andExpect(status().isOk());

        // Next failure starts fresh at 2 attempts remaining
        mockMvc.perform(post("/api/admin/auth/login")
                        .with(req -> { req.setRemoteAddr("192.168.1.200"); return req; })
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(badRequest)))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.remainingAttempts").value(2));
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
