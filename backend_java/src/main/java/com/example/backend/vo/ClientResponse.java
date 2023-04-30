package com.example.backend.vo;

import com.example.backend.domain.ClientEntity;

import io.swagger.v3.oas.annotations.media.Schema;

public class ClientResponse {

    @Schema(description = "Id of user")
    private String userId;

    @Schema(description = "Name of Client")
    private String name;

    public ClientResponse(){
      // default constructor
    }

    public ClientResponse(final String userId, final String name){
        this.userId = userId;
        this.name = name;
    }

    public ClientResponse(final ClientEntity entity){
        this.userId = entity.getId();
        this.name = entity.getName();
    }

    public String getName() {
      return name;
    }

    public void setName(final String name) {
      this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(final String userId) {
        this.userId = userId;
    }
}
