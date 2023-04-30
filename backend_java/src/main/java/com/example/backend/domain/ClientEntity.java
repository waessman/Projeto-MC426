package com.example.backend.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "#{@dbCollections.getClient()}")
public class ClientEntity {

    @Id
    private String id;

    private String name;

    public ClientEntity(){
        // default constructor
    }

    public ClientEntity(final String id, final String name){
        this.id = id;
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }
}
