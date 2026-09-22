package com.nishant.portfolio.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class ProfileDto {

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    private String name;

    @NotBlank(message = "Headline is required")
    @Size(max = 200, message = "Headline must not exceed 200 characters")
    private String headline;

    @Size(max = 5000, message = "Bio must not exceed 5000 characters")
    private String bio;

    @NotBlank(message = "Email is required")
    @Email(message = "Must be a valid email address")
    @Size(max = 150, message = "Email must not exceed 150 characters")
    private String email;

    @Size(max = 50, message = "Phone must not exceed 50 characters")
    private String phone;

    @Size(max = 150, message = "Location must not exceed 150 characters")
    private String location;

    @Pattern(regexp = "^(https?://.+)?$", message = "GitHub URL must start with http:// or https://")
    private String github;

    @Pattern(regexp = "^(https?://.+)?$", message = "LinkedIn URL must start with http:// or https://")
    private String linkedin;

    @Pattern(regexp = "^(https?://.+)?$", message = "Instagram URL must start with http:// or https://")
    private String instagram;

    @Pattern(regexp = "^(https?://.+)?$", message = "LeetCode URL must start with http:// or https://")
    private String leetcode;

    @Pattern(regexp = "^(https?://.+)?$", message = "HackerRank URL must start with http:// or https://")
    private String hackerrank;

    @Size(max = 500, message = "Resume URL must not exceed 500 characters")
    private String resumeUrl;

    private String updatedAt;

    public ProfileDto() {
    }

    public ProfileDto(String name, String headline, String bio, String email, String phone,
                      String location, String github, String linkedin, String instagram,
                      String leetcode, String hackerrank, String resumeUrl, String updatedAt) {
        this.name = name;
        this.headline = headline;
        this.bio = bio;
        this.email = email;
        this.phone = phone;
        this.location = location;
        this.github = github;
        this.linkedin = linkedin;
        this.instagram = instagram;
        this.leetcode = leetcode;
        this.hackerrank = hackerrank;
        this.resumeUrl = resumeUrl;
        this.updatedAt = updatedAt;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getHeadline() {
        return headline;
    }

    public void setHeadline(String headline) {
        this.headline = headline;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getGithub() {
        return github;
    }

    public void setGithub(String github) {
        this.github = github;
    }

    public String getLinkedin() {
        return linkedin;
    }

    public void setLinkedin(String linkedin) {
        this.linkedin = linkedin;
    }

    public String getInstagram() {
        return instagram;
    }

    public void setInstagram(String instagram) {
        this.instagram = instagram;
    }

    public String getLeetcode() {
        return leetcode;
    }

    public void setLeetcode(String leetcode) {
        this.leetcode = leetcode;
    }

    public String getHackerrank() {
        return hackerrank;
    }

    public void setHackerrank(String hackerrank) {
        this.hackerrank = hackerrank;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public void setResumeUrl(String resumeUrl) {
        this.resumeUrl = resumeUrl;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(String updatedAt) {
        this.updatedAt = updatedAt;
    }
}
