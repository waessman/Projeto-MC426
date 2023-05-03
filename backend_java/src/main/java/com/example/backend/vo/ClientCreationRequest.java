package com.example.backend.vo;

import io.swagger.v3.oas.annotations.media.Schema;

public class ClientCreationRequest {

    @Schema(description = "Name of Client")
    private String name;

    public ClientCreationRequest(){
        // default constructor
    }

    public ClientCreationRequest(final String name){
        // default constructor
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }
}
