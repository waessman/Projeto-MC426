package com.example.backend.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.example.backend.config.DatabaseCollectionConfiguration;
import com.example.backend.domain.ClientEntity;

@Repository
public class ClientRepository {

    private static final Logger logger = LoggerFactory.getLogger(ClientRepository.class);

    private final MongoOperations mongoOperations;

    private final DatabaseCollectionConfiguration databaseCollectionConfiguration;

    public ClientRepository(final MongoOperations mongoOperations, final DatabaseCollectionConfiguration databaseCollectionConfiguration){
        this.mongoOperations = mongoOperations;
        this.databaseCollectionConfiguration = databaseCollectionConfiguration;
    }

    public void insertClient(final ClientEntity entity){
        logger.debug("Insert in database a new client");
        final String collectionName = databaseCollectionConfiguration.getClient();
        mongoOperations.insert(entity, collectionName);
        logger.debug("New client insert with id '{}'", entity.getId());
    }

    public ClientEntity findClientById(final String id){
        logger.debug("Retrieving client form db");
        final String collectionName = databaseCollectionConfiguration.getClient();
        final ClientEntity clientEntity = mongoOperations.findById(id, ClientEntity.class, collectionName);
        logger.debug("Retrieved from db client with id '{}'", id);
        return clientEntity;
    }
}
