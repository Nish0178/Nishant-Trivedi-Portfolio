package com.nishant.portfolio.service;

import com.nishant.portfolio.dto.ProjectDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.*;

@Service
public class GitHubSyncService {

    private static final Logger log = LoggerFactory.getLogger(GitHubSyncService.class);
    private static final String GITHUB_API = "https://api.github.com/users/Nish0178/repos?sort=updated&per_page=30";

    // Excluded repositories matching SSOT rules
    private static final Set<String> EXCLUDED_REPOS = Set.of(
            "nishant-trivedi-portfolio",
            "first-contributions",
            "first-contribution"
    );

    private final RestTemplate restTemplate;
    private List<ProjectDto> cachedProjects = null;
    private Instant cacheExpiry = Instant.MIN;
    private static final long CACHE_DURATION_SECONDS = 300; // 5 minutes

    public GitHubSyncService() {
        this.restTemplate = new RestTemplate();
    }

    public synchronized List<ProjectDto> getProjects() {
        Instant now = Instant.now();
        if (cachedProjects != null && now.isBefore(cacheExpiry)) {
            return cachedProjects;
        }

        List<ProjectDto> projects = new ArrayList<>(getCuratedProjects());

        try {
            List<Map<String, Object>> repos = restTemplate.getForObject(GITHUB_API, List.class);
            if (repos != null) {
                Set<String> curatedNames = new HashSet<>();
                for (ProjectDto cp : projects) {
                    curatedNames.add(cp.getName().toLowerCase());
                }

                int discoveredIndex = projects.size() + 1;
                for (Map<String, Object> repo : repos) {
                    Boolean fork = (Boolean) repo.get("fork");
                    if (Boolean.TRUE.equals(fork)) continue;

                    String name = (String) repo.get("name");
                    if (name == null) continue;

                    String lowerName = name.toLowerCase();
                    if (EXCLUDED_REPOS.contains(lowerName)) continue;
                    if (curatedNames.contains(lowerName)) continue;

                    ProjectDto dto = new ProjectDto();
                    dto.setId(String.valueOf(repo.get("id")));
                    dto.setName(name);
                    dto.setTitle(formatTitle(name));
                    dto.setDescription((String) repo.get("description") != null ? (String) repo.get("description") : "Personal engineering repository on GitHub.");
                    dto.setHtmlUrl((String) repo.get("html_url"));
                    dto.setHomepage((String) repo.get("homepage"));
                    dto.setLanguage((String) repo.get("language") != null ? (String) repo.get("language") : "TypeScript");
                    dto.setStargazersCount(repo.get("stargazers_count") instanceof Number ? ((Number) repo.get("stargazers_count")).intValue() : 0);
                    dto.setForksCount(repo.get("forks_count") instanceof Number ? ((Number) repo.get("forks_count")).intValue() : 0);
                    dto.setCategory("DISCOVERED OPEN SOURCE");
                    dto.setStatus("VERIFIED REPO");
                    dto.setTech(List.of(dto.getLanguage(), "Git", "GitHub"));
                    dto.setFeatures(List.of("Public GitHub repository", "Automated system discovery"));
                    dto.setCurated(false);

                    projects.add(dto);
                    curatedNames.add(lowerName);
                }
            }
        } catch (Exception e) {
            log.warn("GitHub API fetch fallback retained curated projects: {}", e.getMessage());
        }

        cachedProjects = projects;
        cacheExpiry = now.plusSeconds(CACHE_DURATION_SECONDS);
        return cachedProjects;
    }

    private List<ProjectDto> getCuratedProjects() {
        List<ProjectDto> list = new ArrayList<>();

        // 1. LaunchPilot AI
        ProjectDto p1 = new ProjectDto();
        p1.setId("curated-01");
        p1.setName("Launch-pilot");
        p1.setTitle("LaunchPilot AI");
        p1.setDescription("AI-powered pre-seed venture acceleration platform that transforms raw startup ideas into validated business models, complete pitch decks, and dynamic landing pages.");
        p1.setHtmlUrl("https://github.com/Nish0178/Launch-pilot");
        p1.setHomepage("https://launch-pilot-eta.vercel.app");
        p1.setLanguage("TypeScript");
        p1.setStargazersCount(5);
        p1.setForksCount(1);
        p1.setCategory("FLAGSHIP // MULTIMODAL AI");
        p1.setStatus("TOP 10 RUNNER-UP");
        p1.setTech(List.of("Next.js 15", "TypeScript", "Prisma", "SQLite", "Gemini 2.5 Flash", "Tailwind CSS"));
        p1.setFeatures(List.of("Top 10 Runner-Up at QBX Arena Hackathon 2026", "Gemini 2.5 Flash pipeline"));
        p1.setCurated(true);
        list.add(p1);

        // 2. TodoPro Engine
        ProjectDto p2 = new ProjectDto();
        p2.setId("curated-02");
        p2.setName("todo-pro-web");
        p2.setTitle("TodoPro Engine");
        p2.setDescription("Production-grade task management system featuring stateless JWT authentication with bcrypt password hashing, compound MongoDB indexing, and interactive productivity analytics.");
        p2.setHtmlUrl("https://github.com/Nish0178/todo-pro-web");
        p2.setHomepage("https://todo-pro-web-frontend.onrender.com");
        p2.setLanguage("JavaScript");
        p2.setStargazersCount(2);
        p2.setForksCount(0);
        p2.setCategory("DISTRIBUTED BACKEND // AUTH");
        p2.setStatus("DEPLOYED ON RENDER");
        p2.setTech(List.of("Node.js", "Express.js", "MongoDB", "Mongoose", "JWT Auth", "Chart.js"));
        p2.setFeatures(List.of("Stateless JWT authentication with bcrypt", "Client PDF/CSV export engine"));
        p2.setCurated(true);
        list.add(p2);

        // 3. Astrospacious
        ProjectDto p3 = new ProjectDto();
        p3.setId("curated-03");
        p3.setName("Astrospacious");
        p3.setTitle("Astrospacious");
        p3.setDescription("Commercial web development platform built during engineering internship at ASTROSPACIOUS. Engineered responsive client UI modules, integrated REST API backends, and reduced DOM repaints.");
        p3.setHtmlUrl("https://github.com/Nish0178");
        p3.setHomepage("https://astrospacious.com");
        p3.setLanguage("HTML5 / CSS3 / JS");
        p3.setStargazersCount(0);
        p3.setForksCount(0);
        p3.setCategory("COMMERCIAL PLATFORM DELIVERY");
        p3.setStatus("INTERNSHIP DELIVERY");
        p3.setTech(List.of("HTML5", "CSS3", "JavaScript", "Node.js", "REST APIs", "Agile Sprints"));
        p3.setFeatures(List.of("Commercial web platform internship delivery", "Node.js REST API integration"));
        p3.setCurated(true);
        list.add(p3);

        return list;
    }

    private String formatTitle(String name) {
        String cleaned = name.replace('-', ' ').replace('_', ' ');
        String[] words = cleaned.split("\\s+");
        StringBuilder sb = new StringBuilder();
        for (String w : words) {
            if (w.isEmpty()) continue;
            sb.append(Character.toUpperCase(w.charAt(0)))
              .append(w.substring(1).toLowerCase())
              .append(" ");
        }
        return sb.toString().trim();
    }
}
