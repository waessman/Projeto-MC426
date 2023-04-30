package com.example.backend.vo;

import io.swagger.v3.oas.annotations.media.Schema;

public class LoginRequest {

    @Schema(description = "Name of user received")
    private String username;

    @Schema(description = "Password of user received")
    private String password;

    public String getUsername() {
        return username;
    }

    public void setUsername(final String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(final String password) {
        this.password = password;
    }
}
