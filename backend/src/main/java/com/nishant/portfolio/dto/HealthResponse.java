package com.nishant.portfolio.dto;

import java.time.LocalDateTime;

public class HealthResponse {

    private String status;
    private String service;
    private String database;
    private LocalDateTime timestamp;

    public HealthResponse() {
        this.status = "UP";
        this.service = "portfolio-api";
        this.database = "UP";
        this.timestamp = LocalDateTime.now();
    }

    public HealthResponse(String status, String service) {
        this(status, service, "UP");
    }

    public HealthResponse(String status, String service, String database) {
        this.status = status;
        this.service = service;
        this.database = database;
        this.timestamp = LocalDateTime.now();
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
