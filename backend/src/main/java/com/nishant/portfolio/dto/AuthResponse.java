package com.nishant.portfolio.dto;

public class AuthResponse {
    private boolean success;
    private String token;
    private String message;
    private AdminUserDto user;

    public AuthResponse() {
    }

    public AuthResponse(boolean success, String token, String message, AdminUserDto user) {
        this.success = success;
        this.token = token;
        this.message = message;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public AdminUserDto getUser() {
        return user;
    }

    public void setUser(AdminUserDto user) {
        this.user = user;
    }
}
