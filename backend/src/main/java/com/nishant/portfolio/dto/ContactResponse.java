package com.nishant.portfolio.dto;

import java.time.LocalDateTime;

public class ContactResponse {

    private boolean success;
    private String message;
    private Long id;
    private LocalDateTime timestamp;

    public ContactResponse() {
        this.timestamp = LocalDateTime.now();
    }

    public ContactResponse(boolean success, String message, Long id) {
        this.success = success;
        this.message = message;
        this.id = id;
        this.timestamp = LocalDateTime.now();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
