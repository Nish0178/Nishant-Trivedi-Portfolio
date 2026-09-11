package com.nishant.portfolio.dto;

import java.time.LocalDateTime;
import java.util.Map;

public class ErrorResponse {

    private boolean success = false;
    private int status = 400;
    private String error = "Error";
    private String message;
    private String path;
    private Map<String, String> errors;
    private String timestamp;

    public ErrorResponse() {
        this.success = false;
        this.timestamp = LocalDateTime.now().toString();
    }

    public ErrorResponse(String message) {
        this.success = false;
        this.message = message;
        this.timestamp = LocalDateTime.now().toString();
    }

    public ErrorResponse(String message, Map<String, String> errors) {
        this.success = false;
        this.message = message;
        this.errors = errors;
        this.timestamp = LocalDateTime.now().toString();
    }

    public ErrorResponse(int status, String error, String message, String path) {
        this.success = false;
        this.status = status;
        this.error = error;
        this.message = message;
        this.path = path;
        this.timestamp = LocalDateTime.now().toString();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
