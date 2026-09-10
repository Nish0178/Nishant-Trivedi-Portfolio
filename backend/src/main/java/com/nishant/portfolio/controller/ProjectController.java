package com.nishant.portfolio.controller;

import com.nishant.portfolio.dto.ProjectDto;
import com.nishant.portfolio.service.GitHubSyncService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final GitHubSyncService gitHubSyncService;

    public ProjectController(GitHubSyncService gitHubSyncService) {
        this.gitHubSyncService = gitHubSyncService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> getProjects() {
        List<ProjectDto> projects = gitHubSyncService.getProjects();
        return ResponseEntity.ok(Map.of(
                "success", true,
                "count", projects.size(),
                "projects", projects
        ));
    }
}
