package com.example.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "#{@dbCollections.getCompany()}")
public class CompanyEntity {

    @Id
    private String id;

    private String displayName;

    public CompanyEntity(){
        // default constructor
    }

    public CompanyEntity(final String id, final String displayName){
        this.id = id;
        this.displayName = displayName;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(final String displayName) {
        this.displayName = displayName;
    }
}
