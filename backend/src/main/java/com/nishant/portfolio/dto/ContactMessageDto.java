package com.nishant.portfolio.dto;

import com.nishant.portfolio.entity.ContactMessage;
import java.time.LocalDateTime;

public class ContactMessageDto {

    private Long id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private LocalDateTime createdAt;
    private String status; // "UNREAD" or "READ"
    private boolean read;   // For frontend compatibility (m.read)
    private String emailStatus;
    private String emailError;

    public ContactMessageDto() {
    }

    public ContactMessageDto(Long id, String name, String email, String subject, String message,
                             LocalDateTime createdAt, String status, boolean read,
                             String emailStatus, String emailError) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.createdAt = createdAt;
        this.status = status;
        this.read = read;
        this.emailStatus = emailStatus;
        this.emailError = emailError;
    }

    public static ContactMessageDto fromEntity(ContactMessage entity) {
        if (entity == null) return null;
        return new ContactMessageDto(
                entity.getId(),
                entity.getName(),
                entity.getEmail(),
                entity.getSubject(),
                entity.getMessage(),
                entity.getCreatedAt(),
                entity.getStatus(),
                entity.isRead(),
                entity.getEmailStatus(),
                entity.getEmailError()
        );
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
        this.read = "READ".equalsIgnoreCase(status);
    }

    public boolean isRead() {
        return read;
    }

    public void setRead(boolean read) {
        this.read = read;
        this.status = read ? "READ" : "UNREAD";
    }

    public String getEmailStatus() {
        return emailStatus;
    }

    public void setEmailStatus(String emailStatus) {
        this.emailStatus = emailStatus;
    }

    public String getEmailError() {
        return emailError;
    }

    public void setEmailError(String emailError) {
        this.emailError = emailError;
    }
}
