package com.example.backend.vo;

import io.swagger.v3.oas.annotations.media.Schema;

public class CompanyCreationRequest {

    @Schema(description = "Name of Company")
    private String displayName;

    public CompanyCreationRequest(){
      // default constructor
    }

    public CompanyCreationRequest(final String displayName){
      // default constructor
      this.displayName = displayName;
    }

    public String getDisplayName() {
      return displayName;
    }

    public void setDisplayName(final String displayName) {
      this.displayName = displayName;
    }
}
