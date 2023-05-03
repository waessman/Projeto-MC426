package com.example.backend.vo;

import com.example.backend.domain.CompanyEntity;

import io.swagger.v3.oas.annotations.media.Schema;

public class CompanyResponse {

    @Schema(description = "Id of company")
    private String companyId;

    @Schema(description = "Name of Company")
    private String displayName;

    public CompanyResponse(){
      // default constructor
    }

    public CompanyResponse(final String companyId, final String displayName){
        this.companyId = companyId;
        this.displayName = displayName;
    }

    public CompanyResponse(final CompanyEntity entity){
        this.companyId = entity.getId();
        this.displayName = entity.getDisplayName();
    }

    public String getCompanyId() {
      return companyId;
    }

    public void setCompanyId(final String companyId) {
      this.companyId = companyId;
    }

    public String getDisplayName() {
      return displayName;
    }

    public void setDisplayName(final String displayName) {
      this.displayName = displayName;
    }
}
