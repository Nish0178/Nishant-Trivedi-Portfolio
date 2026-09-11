package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.ProjectDto;
import com.nishant.portfolio.service.CmsService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProjectControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CmsService cmsService;

    @Test
    @DisplayName("GET /api/projects - Returns 200 OK with success flag and project list")
    void testGetProjectsEndpoint() throws Exception {
        ProjectDto p1 = new ProjectDto();
        p1.setId("curated-01");
        p1.setName("Launch-pilot");
        p1.setTitle("LaunchPilot AI");
        p1.setCurated(true);

        Mockito.when(cmsService.getUnifiedProjects()).thenReturn(List.of(p1));

        mockMvc.perform(get("/api/projects")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.count").value(1))
                .andExpect(jsonPath("$.projects", hasSize(1)))
                .andExpect(jsonPath("$.projects[0].title").value("LaunchPilot AI"));
    }
}
