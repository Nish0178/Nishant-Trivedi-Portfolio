package com.nishant.portfolio.dto;

import java.util.List;

public class ProjectDto {

    private String id;
    private String name;
    private String title;
    private String description;
    private String htmlUrl;
    private String homepage;
    private String language;
    private int stargazersCount;
    private int forksCount;
    private String category;
    private String status;
    private List<String> tech;
    private List<String> features;
    private boolean curated;
    private String imageUrl;

    public ProjectDto() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getHtmlUrl() {
        return htmlUrl;
    }

    public void setHtmlUrl(String htmlUrl) {
        this.htmlUrl = htmlUrl;
    }

    public String getHomepage() {
        return homepage;
    }

    public void setHomepage(String homepage) {
        this.homepage = homepage;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getStargazersCount() {
        return stargazersCount;
    }

    public void setStargazersCount(int stargazersCount) {
        this.stargazersCount = stargazersCount;
    }

    public int getForksCount() {
        return forksCount;
    }

    public void setForksCount(int forksCount) {
        this.forksCount = forksCount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public List<String> getTech() {
        return tech;
    }

    public void setTech(List<String> tech) {
        this.tech = tech;
    }

    public List<String> getFeatures() {
        return features;
    }

    public void setFeatures(List<String> features) {
        this.features = features;
    }

    public boolean isCurated() {
        return curated;
    }

    public void setCurated(boolean curated) {
        this.curated = curated;
    }

    public List<String> getTechnologies() {
        return tech != null ? tech : (language != null ? List.of(language) : List.of());
    }

    public void setTechnologies(List<String> technologies) {
        this.tech = technologies;
    }

    public String getDisplayTitle() {
        return title != null && !title.isBlank() ? title : name;
    }

    public void setDisplayTitle(String displayTitle) {
        this.title = displayTitle;
    }

    public int getStars() {
        return stargazersCount;
    }

    public void setStars(int stars) {
        this.stargazersCount = stars;
    }

    public int getForks() {
        return forksCount;
    }

    public void setForks(int forks) {
        this.forksCount = forks;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
