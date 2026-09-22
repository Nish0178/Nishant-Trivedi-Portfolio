package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.ProfileDto;
import com.nishant.portfolio.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AdminProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private JwtService jwtService;

    private String validAdminToken;

    @BeforeEach
    void setUp() {
        validAdminToken = jwtService.generateToken("test-admin@example.com", "ROLE_ADMIN");
    }

    @Test
    @DisplayName("GET /api/admin/profile without authentication should be rejected with 401")
    void testGetProfileUnauthorized() throws Exception {
        mockMvc.perform(get("/api/admin/profile"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    @DisplayName("GET /api/admin/profile with valid token should return profile data")
    void testGetProfileAuthorized() throws Exception {
        mockMvc.perform(get("/api/admin/profile")
                        .header("Authorization", "Bearer " + validAdminToken))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", notNullValue()))
                .andExpect(jsonPath("$.email", notNullValue()))
                .andExpect(jsonPath("$.headline", notNullValue()));
    }

    @Test
    @DisplayName("GET /api/content/profile public endpoint should return 200 OK without token")
    void testGetPublicProfile() throws Exception {
        mockMvc.perform(get("/api/content/profile"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", notNullValue()))
                .andExpect(jsonPath("$.email", notNullValue()));
    }

    @Test
    @DisplayName("PUT /api/admin/profile updates profile and synchronizes section and social data")
    void testUpdateProfileSuccess() throws Exception {
        ProfileDto dto = new ProfileDto();
        dto.setName("Nishant Trivedi");
        dto.setHeadline("Software Engineer · Full-Stack & AI Builder");
        dto.setBio("Updated bio for personal engineering portfolio.");
        dto.setEmail("trivedinishant880@gmail.com");
        dto.setLocation("Lucknow, Uttar Pradesh, India");
        dto.setGithub("https://github.com/Nish0178");
        dto.setLinkedin("https://www.linkedin.com/in/nishant-trivedi-363ba3249");
        dto.setInstagram("https://www.instagram.com/nishant_trivedi.2111/");
        dto.setLeetcode("https://leetcode.com/u/Nishant_trivedi01111/");
        dto.setHackerrank("https://www.hackerrank.com/profile/trivedinishant81");
        dto.setResumeUrl("/resume/Nishant_Trivedi_Resume.pdf");

        mockMvc.perform(put("/api/admin/profile")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name", is("Nishant Trivedi")))
                .andExpect(jsonPath("$.bio", is("Updated bio for personal engineering portfolio.")))
                .andExpect(jsonPath("$.email", is("trivedinishant880@gmail.com")));
    }

    @Test
    @DisplayName("PUT /api/admin/profile fails with 400 Bad Request when email is invalid")
    void testUpdateProfileInvalidEmail() throws Exception {
        ProfileDto dto = new ProfileDto();
        dto.setName("Nishant Trivedi");
        dto.setHeadline("Software Engineer");
        dto.setEmail("invalid-email-address");

        mockMvc.perform(put("/api/admin/profile")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("PUT /api/admin/profile fails with 400 Bad Request when name is blank")
    void testUpdateProfileBlankName() throws Exception {
        ProfileDto dto = new ProfileDto();
        dto.setName("");
        dto.setHeadline("Software Engineer");
        dto.setEmail("test@example.com");

        mockMvc.perform(put("/api/admin/profile")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }

    @Test
    @DisplayName("PUT /api/admin/profile fails with 400 Bad Request when GitHub URL is invalid")
    void testUpdateProfileInvalidUrl() throws Exception {
        ProfileDto dto = new ProfileDto();
        dto.setName("Nishant Trivedi");
        dto.setHeadline("Software Engineer");
        dto.setEmail("test@example.com");
        dto.setGithub("ftp://invalid-protocol.com");

        mockMvc.perform(put("/api/admin/profile")
                        .header("Authorization", "Bearer " + validAdminToken)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isBadRequest());
    }
}
