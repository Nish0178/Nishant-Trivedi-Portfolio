package com.nishant.portfolio.service;

import com.nishant.portfolio.dto.ProjectDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static org.junit.jupiter.api.Assertions.*;

class GitHubSyncServiceTest {

    @Test
    @DisplayName("GitHubSyncService - Fallback/offline returns 3 verified curated projects")
    void testCuratedProjectsAlwaysPresent() {
        GitHubSyncService service = new GitHubSyncService();
        List<ProjectDto> projects = service.getProjects();

        assertNotNull(projects, "Projects list must never be null");
        assertTrue(projects.size() >= 3, "Curated baseline must contain at least 3 flagship projects");

        Set<String> titles = projects.stream().map(ProjectDto::getTitle).collect(Collectors.toSet());
        assertTrue(titles.contains("LaunchPilot AI"), "Must contain LaunchPilot AI");
        assertTrue(titles.contains("TodoPro Engine"), "Must contain TodoPro Engine");
        assertTrue(titles.contains("Astrospacious"), "Must contain Astrospacious");
    }

    @Test
    @DisplayName("GitHubSyncService - Excluded repositories are not in the output")
    void testExcludedRepositoriesAreFiltered() {
        GitHubSyncService service = new GitHubSyncService();
        List<ProjectDto> projects = service.getProjects();

        Set<String> names = projects.stream()
                .map(p -> p.getName().toLowerCase())
                .collect(Collectors.toSet());

        assertFalse(names.contains("nishant-trivedi-portfolio"), "Portfolio repo itself must be excluded");
        assertFalse(names.contains("first-contributions"), "first-contributions must be excluded");
        assertFalse(names.contains("first-contribution"), "first-contribution must be excluded");
    }

    @Test
    @DisplayName("GitHubSyncService - Deduplication prevents duplicate LaunchPilot entries")
    void testDeduplicationForLaunchPilot() {
        GitHubSyncService service = new GitHubSyncService();
        List<ProjectDto> projects = service.getProjects();

        long launchPilotCount = projects.stream()
                .filter(p -> "LaunchPilot AI".equalsIgnoreCase(p.getTitle()) || "launch-pilot".equalsIgnoreCase(p.getName()))
                .count();

        assertEquals(1, launchPilotCount, "LaunchPilot must be deduplicated to exactly 1 entry");
    }
}
