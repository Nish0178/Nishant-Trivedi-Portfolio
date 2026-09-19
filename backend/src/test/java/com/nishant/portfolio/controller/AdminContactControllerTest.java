package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.entity.AdminUser;
import com.nishant.portfolio.entity.ContactMessage;
import com.nishant.portfolio.repository.AdminUserRepository;
import com.nishant.portfolio.repository.ContactMessageRepository;
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

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AdminUserRepository adminUserRepository;

    @Autowired
    private ContactMessageRepository contactMessageRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private String validAdminToken;
    private ContactMessage testMessage;

    @BeforeEach
    void setUp() {
        contactMessageRepository.deleteAll();
        adminUserRepository.deleteAll();

        AdminUser admin = new AdminUser("test-admin@example.com", passwordEncoder.encode("TestPassword123!"), "ADMIN");
        adminUserRepository.save(admin);
        validAdminToken = jwtService.generateToken("test-admin@example.com", "ADMIN");

        testMessage = new ContactMessage(
                "Morgan Vance",
                "morgan@vance-systems.com",
                "Distributed Core Architecture",
                "Would love to discuss your systems architecture expertise.",
                "10.0.0.42"
        );
        testMessage = contactMessageRepository.save(testMessage);
    }

    @Test
    @DisplayName("5. GET /api/admin/messages requires admin authentication")
    void testMessageListRequiresAuthentication() throws Exception {
        // Without authentication -> 401 Unauthorized
        mockMvc.perform(get("/api/admin/messages")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());

        // With valid token -> 200 OK
        mockMvc.perform(get("/api/admin/messages")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(greaterThanOrEqualTo(1))))
                .andExpect(jsonPath("$[0].name").value("Morgan Vance"))
                .andExpect(jsonPath("$[0].status").value("UNREAD"))
                .andExpect(jsonPath("$[0].read").value(false));
    }

    @Test
    @DisplayName("GET /api/admin/messages/{id} requires admin authentication")
    void testGetMessageByIdRequiresAuthentication() throws Exception {
        // Without authentication -> 401
        mockMvc.perform(get("/api/admin/messages/" + testMessage.getId())
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());

        // With valid token -> 200 OK
        mockMvc.perform(get("/api/admin/messages/" + testMessage.getId())
                        .header("Authorization", "Bearer " + validAdminToken)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(testMessage.getId()))
                .andExpect(jsonPath("$.name").value("Morgan Vance"))
                .andExpect(jsonPath("$.email").value("morgan@vance-systems.com"))
                .andExpect(jsonPath("$.subject").value("Distributed Core Architecture"))
                .andExpect(jsonPath("$.message").value("Would love to discuss your systems architecture expertise."));
    }

    @Test
    @DisplayName("6. PATCH /api/admin/messages/{id}/read requires authentication and toggles status")
    void testMarkReadRequiresAuthentication() throws Exception {
        // Without authentication -> 401
        mockMvc.perform(patch("/api/admin/messages/" + testMessage.getId() + "/read")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("isRead", true))))
                .andExpect(status().isUnauthorized());

        // With valid token -> mark as read
        mockMvc.perform(patch("/api/admin/messages/" + testMessage.getId() + "/read")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("isRead", true))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.read").value(true))
                .andExpect(jsonPath("$.status").value("READ"));

        // Verify in DB
        ContactMessage updated = contactMessageRepository.findById(testMessage.getId()).orElseThrow();
        assertTrue(updated.isRead());

        // Mark back as unread
        mockMvc.perform(patch("/api/admin/messages/" + testMessage.getId() + "/read")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(Map.of("status", "UNREAD"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.read").value(false))
                .andExpect(jsonPath("$.status").value("UNREAD"));

        updated = contactMessageRepository.findById(testMessage.getId()).orElseThrow();
        assertFalse(updated.isRead());
    }

    @Test
    @DisplayName("7. DELETE /api/admin/messages/{id} requires authentication and removes message")
    void testDeleteRequiresAuthentication() throws Exception {
        // Without authentication -> 401
        mockMvc.perform(delete("/api/admin/messages/" + testMessage.getId()))
                .andExpect(status().isUnauthorized());

        // Message should still exist
        assertTrue(contactMessageRepository.existsById(testMessage.getId()));

        // With valid token -> 200 OK
        mockMvc.perform(delete("/api/admin/messages/" + testMessage.getId())
                        .header("Authorization", "Bearer " + validAdminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true));

        // Verify removed from DB
        assertFalse(contactMessageRepository.existsById(testMessage.getId()));
    }

    @Test
    @DisplayName("GET /api/admin/messages/{id} - Non-existent ID returns 404 Not Found")
    void testGetMessageByIdNotFound() throws Exception {
        mockMvc.perform(get("/api/admin/messages/999999")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"));
    }

    @Test
    @DisplayName("DELETE /api/admin/messages/{id} - Non-existent ID returns 404 Not Found")
    void testDeleteNotFound() throws Exception {
        mockMvc.perform(delete("/api/admin/messages/999999")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.status").value(404))
                .andExpect(jsonPath("$.error").value("Not Found"));
    }
}
