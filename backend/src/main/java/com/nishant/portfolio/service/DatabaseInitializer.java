package com.nishant.portfolio.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nishant.portfolio.entity.*;
import com.nishant.portfolio.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(DatabaseInitializer.class);

    private final AdminUserRepository adminUserRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final SkillRepository skillRepository;
    private final AchievementRepository achievementRepository;
    private final EducationRepository educationRepository;
    private final SocialLinkRepository socialLinkRepository;
    private final CmsSectionRepository cmsSectionRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${app.admin.email:admin@nishanttrivedi.com}")
    private String adminEmail;

    @Value("${app.admin.password:Admin@Nishant2026!}")
    private String adminPassword;

    public DatabaseInitializer(
            AdminUserRepository adminUserRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            SkillRepository skillRepository,
            AchievementRepository achievementRepository,
            EducationRepository educationRepository,
            SocialLinkRepository socialLinkRepository,
            CmsSectionRepository cmsSectionRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.adminUserRepository = adminUserRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.skillRepository = skillRepository;
        this.achievementRepository = achievementRepository;
        this.educationRepository = educationRepository;
        this.socialLinkRepository = socialLinkRepository;
        this.cmsSectionRepository = cmsSectionRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        try {
            seedAdminUser();
            seedProjects();
            seedExperiences();
            seedSkills();
            seedAchievements();
            seedEducation();
            seedSocials();
            seedSections();
            log.info("Database initialization completed successfully.");
        } catch (Exception e) {
            log.warn("Database initialization deferred: {}", e.getMessage());
        }
    }

    private void seedAdminUser() {
        if (adminUserRepository.count() == 0) {
            log.info("Provisioning initial admin user: {}", adminEmail);
            AdminUser admin = new AdminUser(
                    adminEmail.trim().toLowerCase(),
                    passwordEncoder.encode(adminPassword),
                    "ADMIN"
            );
            adminUserRepository.save(admin);
        }
    }

    private void seedProjects() {
        if (projectRepository.count() == 0) {
            log.info("Seeding curated portfolio projects into PostgreSQL");

            // 1. LaunchPilot AI
            ProjectEntity p1 = new ProjectEntity();
            p1.setId("launchpilot-ai");
            p1.setTitle("LaunchPilot AI");
            p1.setName("Launch-pilot");
            p1.setCategory("FLAGSHIP // MULTIMODAL AI");
            p1.setTagline("Deterministic AI startup validation, SWOT modeling, and synthetic investor simulation.");
            p1.setDescription("Engineered a production-ready startup validation engine that analyzes market feasibility, constructs multi-angle SWOT assessments, questions unit economics via synthetic digital-twin co-founders, and outputs structured investor dossiers.");
            p1.setGithubUrl("https://github.com/Nish0178/Launch-pilot");
            p1.setLiveUrl("https://launch-pilot-eta.vercel.app");
            p1.setLanguage("TypeScript");
            p1.setTechnologies("Next.js 15, TypeScript, Node.js, Express.js, Prisma ORM, SQLite, Gemini 2.5 Flash, Clerk Auth, Tailwind CSS, Render");
            p1.setFeatures("Top 10 Runner-Up at QBX Arena Hackathon 2026\nDeterministic prompt chaining with strict JSON schema parsing\nSynthetic digital twin simulation challenging unit economics and GTM strategy\nRelational persistence of structured pitch dossiers via Prisma ORM");
            p1.setStargazersCount(5);
            p1.setForksCount(1);
            p1.setFeatured(true);
            p1.setVisible(true);
            p1.setSortOrder(1);
            p1.setCurated(true);
            projectRepository.save(p1);

            // 2. TodoPro Engine
            ProjectEntity p2 = new ProjectEntity();
            p2.setId("todopro");
            p2.setTitle("TodoPro Engine");
            p2.setName("todo-pro-web");
            p2.setCategory("DISTRIBUTED BACKEND // AUTH");
            p2.setTagline("Stateless JWT-authenticated productivity engine with weekly velocity charts.");
            p2.setDescription("Architected and deployed a resilient task management engine featuring stateless token authentication, indexed MongoDB document collections for sub-millisecond querying, real-time productivity telemetry, and client PDF/CSV data exports.");
            p2.setGithubUrl("https://github.com/Nish0178/todo-pro-web");
            p2.setLiveUrl("https://todo-pro-web-frontend.onrender.com");
            p2.setLanguage("JavaScript");
            p2.setTechnologies("Node.js, Express.js, MongoDB, Mongoose, JWT Authentication, Chart.js, jsPDF, Vanilla JavaScript, Render Cloud");
            p2.setFeatures("Stateless JWT auth with bcrypt-hashed credentials & route authorization guards\nCompound MongoDB indexing enabling low-latency task filtering and priority sorting\nInteractive productivity telemetry and completion velocity rendered with Chart.js\nClient-side document export pipeline supporting PDF and CSV report generation");
            p2.setStargazersCount(2);
            p2.setForksCount(0);
            p2.setFeatured(true);
            p2.setVisible(true);
            p2.setSortOrder(2);
            p2.setCurated(true);
            projectRepository.save(p2);

            // 3. Astrospacious
            ProjectEntity p3 = new ProjectEntity();
            p3.setId("astrospacious");
            p3.setTitle("Astrospacious");
            p3.setName("Astrospacious");
            p3.setCategory("COMMERCIAL PLATFORM DELIVERY");
            p3.setTagline("Responsive commercial web modules, DOM performance, and REST API integrations.");
            p3.setDescription("Contributed to production web development at Astrospacious in an agile squad environment. Focused on engineering responsive cross-device UI modules, integrating Node.js REST endpoints, and optimizing DOM repaint performance.");
            p3.setGithubUrl("https://github.com/Nish0178");
            p3.setLiveUrl("https://astrospacious.com");
            p3.setLanguage("HTML5 / CSS3 / JS");
            p3.setTechnologies("HTML5, CSS3, JavaScript (ES6+), Node.js, REST APIs, Responsive Layouts, Agile / Git Flow");
            p3.setFeatures("Engineered responsive commercial interface modules across mobile, tablet, and desktop\nConnected client components with backend REST endpoints with defensive error handling\nAudited client scripts and reduced layout repaints to improve page rendering metrics\nManaged feature branches, Git pull requests, and peer code reviews during sprint cycles");
            p3.setStargazersCount(0);
            p3.setForksCount(0);
            p3.setFeatured(true);
            p3.setVisible(true);
            p3.setSortOrder(3);
            p3.setCurated(true);
            projectRepository.save(p3);
        }
    }

    private void seedExperiences() {
        if (experienceRepository.count() == 0) {
            log.info("Seeding experiences into PostgreSQL");
            createExperience("July 2026 – Present", "Techdock Labs", "AI Video Editor Intern", "Remote / Lucknow", "Internship",
                    "Engineering multimodal AI video generation workflows utilizing Google Veo, Google Flow, and Claude prompt architectures.\nStructuring repeatable prompt frameworks for generative video synthesis and automated asset transformation pipelines.\nManaging media storage pipelines and asset hosting workflows on Google Cloud Platform infrastructure.",
                    "Google Veo, Google Flow, Claude AI, Prompt Engineering, GCP, Asset Pipelines", 1);

            createExperience("July 2026 – Present", "Open Source Connect Global", "Campus Lead & Contributor", "Campus / Remote", "Leadership",
                    "Leading the campus developer chapter, organizing open-source onboarding workshops, and mentoring 50+ students on Git workflows.\nReviewing and submitting pull requests, bug fixes, and documentation improvements to active community repositories.\nFacilitating collaborative hack sessions focused on distributed version control and collaborative software development.",
                    "Git, GitHub, OSS Mentorship, Code Reviews, JavaScript, Python", 2);

            createExperience("Nov 2025 – Aug 2026", "ASTROSPACIOUS", "Web Development Intern", "Remote", "Internship",
                    "Developed responsive client interface modules with clean semantic HTML5, modern CSS3 custom properties, and JavaScript.\nIntegrated backend REST endpoints for dynamic data delivery with structured error fallbacks.\nCollaborated in agile sprint cycles, delivering assigned feature tickets and participating in weekly design reviews.",
                    "HTML5, CSS3, JavaScript, Node.js, REST APIs, Agile Sprints", 3);

            createExperience("Jan 2026 – Apr 2026", "StaxTech", "Full-Stack Developer Intern", "Remote", "Internship",
                    "Engineered backend REST microservices in Node.js/Express.js with JWT authentication and middleware guards.\nConstructed MongoDB schemas with index optimization for high-throughput queries.\nCollaborated on API contracts, endpoint testing via Postman, and frontend data integration.",
                    "Node.js, Express.js, MongoDB, JWT Auth, REST APIs, Postman", 4);

            createExperience("Jan 2026 – Apr 2026", "Techkriti, IIT Kanpur", "Campus Ambassador", "Campus", "Leadership",
                    "Represented IIT Kanpur's annual technical festival on campus, driving technical competition participation and hackathon teams.\nCoordinated campus technical outreach and managed student delegate registrations.",
                    "Technical Outreach, Event Coordination, Community Leadership", 5);

            createExperience("Nov 2025 – Feb 2026", "IIT Guwahati", "Campus Ambassador", "Campus", "Leadership",
                    "Spearheaded technical promotions and student engagement for technical events and collegiate competitions.\nFacilitated campus workshops to promote algorithmic problem-solving and software engineering awareness.",
                    "Community Building, Campus Outreach, Student Engagement", 6);
        }
    }

    private void createExperience(String period, String company, String role, String location, String type, String contributions, String tech, int order) {
        ExperienceEntity exp = new ExperienceEntity();
        exp.setPeriod(period);
        exp.setCompany(company);
        exp.setRole(role);
        exp.setLocation(location);
        exp.setType(type);
        exp.setContributions(contributions);
        exp.setTechnologies(tech);
        exp.setSortOrder(order);
        exp.setVisible(true);
        experienceRepository.save(exp);
    }

    private void seedSkills() {
        if (skillRepository.count() == 0) {
            log.info("Seeding skills matrix into PostgreSQL");
            int order = 1;
            // Languages
            createSkill("languages", "Java", "Primary OOP, Backend Services, Enterprise Algorithms", order++);
            createSkill("languages", "JavaScript (ES6+)", "Modern Async Web, Dynamic Systems", order++);
            createSkill("languages", "TypeScript", "Type-Safe Contracts, Interface Architecture", order++);
            createSkill("languages", "SQL", "Relational Queries, Schema Normalization", order++);
            createSkill("languages", "Python", "Scripting, Automation, AI Integration", order++);

            // Frontend
            createSkill("frontend", "React 19 & Next.js 15", "App Router, SSR/SSG, Server & Client Components", order++);
            createSkill("frontend", "Tailwind CSS v4", "Utility-First Tokens, Clean Design Systems", order++);
            createSkill("frontend", "Motion", "Spring Physics, Staggered Reveals, Scroll Choreography", order++);
            createSkill("frontend", "HTML5 & CSS3", "Semantic Structure, Custom Properties, Responsive Layouts", order++);

            // Backend
            createSkill("backend", "Java Spring Boot 3", "REST APIs, Security, JPA Hibernate, Enterprise Services", order++);
            createSkill("backend", "Node.js & Express.js", "High-Concurrency Async Runtime & REST Microservices", order++);
            createSkill("backend", "JWT Authentication", "Stateless Token-Based Auth, BCrypt, Route Guards", order++);

            // Databases
            createSkill("databases", "PostgreSQL & MySQL", "Relational Integrity, Indexing, ACID Transactions", order++);
            createSkill("databases", "MongoDB", "Document NoSQL, Aggregation Pipelines & Compound Indexing", order++);
            createSkill("databases", "Prisma ORM", "Type-Safe Client, Schema Migrations & Queries", order++);

            // AI Ecosystem
            createSkill("aiEcosystem", "Google Gemini 2.5 Flash", "Structured JSON Output, Fast Inference", order++);
            createSkill("aiEcosystem", "Claude AI & OpenAI", "Prompt Chaining & System Architecture Analysis", order++);
        }
    }

    private void createSkill(String category, String name, String roleDesc, int order) {
        SkillEntity skill = new SkillEntity();
        skill.setCategory(category);
        skill.setName(name);
        skill.setRoleDesc(roleDesc);
        skill.setSortOrder(order);
        skill.setVisible(true);
        skillRepository.save(skill);
    }

    private void seedAchievements() {
        if (achievementRepository.count() == 0) {
            log.info("Seeding achievements into PostgreSQL");
            createAchievement("QBX Arena Hackathon 2026", "Top 10 Runner-Up", "GGES University, Unnao", "2026",
                    "Recognized nationally for engineering LaunchPilot AI — an AI-powered startup validation and simulation platform.", 1);
            createAchievement("Open Source Connect Global", "Campus Lead", "Open Source Connect", "2026",
                    "Spearheaded campus open-source initiative, organizing onboarding workshops and mentoring 50+ developers.", 2);
            createAchievement("Elite Coders Winter of Code", "Official Contributor", "Elite Coders", "2026",
                    "Contributed production code patches, algorithmic implementations, and documentation to active OSS repositories.", 3);
            createAchievement("Algorithmic Problem Solving", "400+ Solved · 1415 Rating", "LeetCode", "2026",
                    "Demonstrated continuous algorithmic rigor across core Data Structures & Algorithms in Java.", 4);
        }
    }

    private void createAchievement(String title, String badge, String venue, String year, String desc, int order) {
        AchievementEntity a = new AchievementEntity();
        a.setTitle(title);
        a.setBadge(badge);
        a.setIssuerOrVenue(venue);
        a.setYear(year);
        a.setDescription(desc);
        a.setSortOrder(order);
        a.setVisible(true);
        achievementRepository.save(a);
    }

    private void seedEducation() {
        if (educationRepository.count() == 0) {
            log.info("Seeding education into PostgreSQL");
            EducationEntity edu = new EducationEntity();
            edu.setDegree("B.Tech in Computer Science & Engineering");
            edu.setInstitution("Dr. A.P.J. Abdul Kalam Technical University (AKTU)");
            edu.setLocation("Lucknow, Uttar Pradesh, India");
            edu.setPeriod("July 2024 – September 2028");
            edu.setDetails("Core curriculum in Algorithms, Operating Systems, Database Systems, Computer Networks, and Object-Oriented Software Engineering.");
            edu.setSortOrder(1);
            edu.setVisible(true);
            educationRepository.save(edu);
        }
    }

    private void seedSocials() {
        if (socialLinkRepository.count() == 0) {
            log.info("Seeding canonical social links into PostgreSQL");
            createSocial("GitHub", "https://github.com/Nish0178", "github", 1);
            createSocial("LinkedIn", "https://www.linkedin.com/in/nishant-trivedi-363ba3249", "linkedin", 2);
            createSocial("LeetCode", "https://leetcode.com/u/Nishant_trivedi01111/", "code", 3);
            createSocial("Instagram", "https://www.instagram.com/nishant_trivedi.2111/", "instagram", 4);
            createSocial("HackerRank", "https://www.hackerrank.com/profile/trivedinishant81", "terminal", 5);
        }
    }

    private void createSocial(String platform, String url, String icon, int order) {
        SocialLinkEntity link = new SocialLinkEntity();
        link.setPlatform(platform);
        link.setUrl(url);
        link.setIcon(icon);
        link.setSortOrder(order);
        link.setVisible(true);
        socialLinkRepository.save(link);
    }

    private void seedSections() {
        try {
            if (cmsSectionRepository.findBySectionKeyIgnoreCase("HERO").isEmpty()) {
                Map<String, Object> heroData = Map.of(
                        "badgeName", "NISHANT",
                        "headlineLine1", "I BUILD",
                        "headlineLine2", "DIGITAL",
                        "headlineLine3", "EXPERIENCES",
                        "subRoles", List.of("FULL STACK DEVELOPER", "UI/UX DESIGNER", "DATA SCIENCE"),
                        "bio", "Building products, systems, and AI-powered experiences across the full stack.",
                        "ctaPrimaryText", "EXPLORE WORK",
                        "ctaPrimaryHref", "#work",
                        "ctaSecondaryText", "INITIALIZE TRANSMISSION",
                        "ctaSecondaryHref", "#contact"
                );
                cmsSectionRepository.save(new CmsSection("HERO", objectMapper.writeValueAsString(heroData)));
            }

            if (cmsSectionRepository.findBySectionKeyIgnoreCase("ABOUT").isEmpty()) {
                Map<String, Object> aboutData = Map.of(
                        "title", "SYSTEMS BUILDER & FULL-STACK ENGINEER",
                        "bioParagraph1", "I am a computer science undergraduate and software engineer focused on building robust full-stack applications, intelligent AI pipelines, and high-performance digital interfaces.",
                        "bioParagraph2", "With deep experience in Java, Spring Boot, React, Next.js, and modern databases, I approach software engineering from first principles: clean architecture, reliable persistence, and intuitive human experience.",
                        "stats", List.of(
                                Map.of("number", "400+", "label", "DSA SOLVED", "subtext", "Java & LeetCode Verified", "highlight", true),
                                Map.of("number", "B.Tech", "label", "AKTU CS '28", "subtext", "CSE · Lucknow, IN", "highlight", false),
                                Map.of("number", "10+", "label", "PROJECTS & REPOS", "subtext", "Full-Stack & AI Tools", "highlight", false),
                                Map.of("number", "TOP 10", "label", "HACKATHON RUNNER-UP", "subtext", "QBX Arena 2026", "highlight", true)
                        )
                );
                cmsSectionRepository.save(new CmsSection("ABOUT", objectMapper.writeValueAsString(aboutData)));
            }

            if (cmsSectionRepository.findBySectionKeyIgnoreCase("RESUME").isEmpty()) {
                Map<String, Object> resumeData = Map.of(
                        "title", "Nishant Trivedi — Software Engineer Resume",
                        "fileUrl", "/resume/Nishant_Trivedi_Resume.pdf",
                        "lastUpdated", "September 2026",
                        "downloadCount", 142,
                        "visible", true
                );
                cmsSectionRepository.save(new CmsSection("RESUME", objectMapper.writeValueAsString(resumeData)));
            }

            if (cmsSectionRepository.findBySectionKeyIgnoreCase("SITE_SETTINGS").isEmpty()) {
                Map<String, Object> settingsData = Map.of(
                        "siteTitle", "Nishant Trivedi — Personal Engineering Portfolio & Digital Identity",
                        "metaDescription", "Software engineer building products, systems, and AI-powered experiences across the full stack.",
                        "email", "trivedinishant880@gmail.com",
                        "location", "Lucknow, Uttar Pradesh, India (IST UTC +05:30)",
                        "availabilityStatus", "OPEN FOR ROLES & PROJECTS",
                        "maintenanceMode", false
                );
                cmsSectionRepository.save(new CmsSection("SITE_SETTINGS", objectMapper.writeValueAsString(settingsData)));
            }
        } catch (Exception e) {
            log.warn("Could not serialize seed sections: {}", e.getMessage());
        }
    }
}
