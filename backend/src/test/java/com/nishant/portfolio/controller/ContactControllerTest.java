package com.nishant.portfolio.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.dto.ContactRequest;
import com.nishant.portfolio.dto.ContactResponse;
import com.nishant.portfolio.service.ContactService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ContactService contactService;

    @Test
    @DisplayName("POST /api/contact - Valid input returns 201 Created")
    void testValidContactSubmission() throws Exception {
        ContactRequest request = new ContactRequest(
                "Alex Reed",
                "alex.reed@tech.corp",
                "Full Stack Opportunity",
                "We would like to discuss an engineering role with you."
        );

        Mockito.when(contactService.saveContactMessage(any(ContactRequest.class), anyString()))
                .thenReturn(new ContactResponse(true, "Your transmission has been received and logged.", 101L));

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.id").value(101))
                .andExpect(jsonPath("$.message").value("Your transmission has been received and logged."));
    }

    @Test
    @DisplayName("POST /api/contact - Invalid email returns 400 Bad Request")
    void testInvalidEmailSubmission() throws Exception {
        ContactRequest request = new ContactRequest(
                "Alex Reed",
                "not-a-valid-email",
                "Full Stack Opportunity",
                "We would like to discuss an engineering role with you."
        );

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.email").exists());
    }

    @Test
    @DisplayName("POST /api/contact - Blank fields return 400 Bad Request")
    void testBlankFieldsSubmission() throws Exception {
        ContactRequest request = new ContactRequest("", "", "", "");

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.name").exists())
                .andExpect(jsonPath("$.errors.email").exists())
                .andExpect(jsonPath("$.errors.subject").exists())
                .andExpect(jsonPath("$.errors.message").exists());
    }
}
