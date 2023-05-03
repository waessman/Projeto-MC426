package com.example.backend.repository;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.stereotype.Repository;

import com.example.backend.config.DatabaseCollectionConfiguration;
import com.example.backend.domain.CompanyEntity;

@Repository
public class CompanyRepository {

    private static final Logger logger = LoggerFactory.getLogger(CompanyRepository.class);

    private final MongoOperations mongoOperations;

    private final DatabaseCollectionConfiguration databaseCollectionConfiguration;

    public CompanyRepository(final MongoOperations mongoOperations, final DatabaseCollectionConfiguration databaseCollectionConfiguration){
        this.mongoOperations = mongoOperations;
        this.databaseCollectionConfiguration = databaseCollectionConfiguration;
    }

    public void insertCompany(final CompanyEntity entity){
        logger.debug("Insert in database a new company");
        final String collectionName = databaseCollectionConfiguration.getCompany();
        mongoOperations.insert(entity, collectionName);
        logger.debug("New company insert with id '{}'", entity.getId());
    }

    public CompanyEntity findCompanyById(final String id){
        logger.debug("Retrieving company form db");
        final String collectionName = databaseCollectionConfiguration.getCompany();
        final CompanyEntity companyEntity = mongoOperations.findById(id, CompanyEntity.class, collectionName);
        logger.debug("Retrieved from db company with id '{}'", id);
        return companyEntity;
    }
}
