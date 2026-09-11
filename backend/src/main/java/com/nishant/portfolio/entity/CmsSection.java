package com.nishant.portfolio.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "cms_sections")
public class CmsSection {

    @Id
    @Column(name = "section_key", nullable = false, unique = true, length = 50)
    private String sectionKey; // HERO, ABOUT, RESUME, SITE_SETTINGS

    @Column(name = "content_json", nullable = false, columnDefinition = "TEXT")
    private String contentJson;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    public CmsSection() {
    }

    public CmsSection(String sectionKey, String contentJson) {
        this.sectionKey = sectionKey;
        this.contentJson = contentJson;
        this.updatedAt = LocalDateTime.now();
    }

    @PrePersist
    @PreUpdate
    public void onSave() {
        this.updatedAt = LocalDateTime.now();
    }

    public String getSectionKey() {
        return sectionKey;
    }

    public void setSectionKey(String sectionKey) {
        this.sectionKey = sectionKey;
    }

    public String getContentJson() {
        return contentJson;
    }

    public void setContentJson(String contentJson) {
        this.contentJson = contentJson;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
