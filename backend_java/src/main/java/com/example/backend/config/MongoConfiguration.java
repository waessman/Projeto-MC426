package com.example.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.MDC;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.mongo.MongoAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultMongoTypeMapper;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.index.IndexOperations;
import org.springframework.data.mongodb.core.index.IndexResolver;
import org.springframework.data.mongodb.core.index.MongoPersistentEntityIndexResolver;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;

import com.example.backend.domain.ClientEntity;
import com.example.backend.domain.CompanyEntity;

@Configuration
@Import(value = MongoAutoConfiguration.class)
public class MongoConfiguration {

    private static final Logger logger = LoggerFactory.getLogger(MongoConfiguration.class);

    @Autowired
    private MongoDatabaseFactory mongoDbFactory;

    @Autowired
    private MongoMappingContext mongoMappingContext;

    @Autowired
    private DatabaseCollectionConfiguration collectionProperties;

    @Bean
    public MongoTransactionManager mongoTransactionManager() {
        return new MongoTransactionManager(this.mongoDbFactory);
    }

    @Bean
    public MongoTemplate mongoTemplate(final MappingMongoConverter converter) {
        final MongoTemplate mongoTemplate = new MongoTemplate(this.mongoDbFactory, converter);
        createCollectionsAndIndexesIfNecessary(mongoTemplate);
        return mongoTemplate;
    }

    private void createCollectionsAndIndexesIfNecessary(final MongoTemplate mongoTemplate) {
        try {
            // create Client collection
            final String clientCollection = collectionProperties.getClient();
            createCollectionsAndIndexes(mongoTemplate, clientCollection, ClientEntity.class);

            // create Company collection
            final String companyCollection = collectionProperties.getCompany();
            createCollectionsAndIndexes(mongoTemplate, companyCollection, CompanyEntity.class);
        } finally {
            MDC.clear();
        }
    }

    private void createCollectionsAndIndexes(final MongoTemplate mongoTemplate, final String collection, final Class<?> classObject) {
        final IndexResolver resolver = new MongoPersistentEntityIndexResolver(this.mongoMappingContext);
        if (!mongoTemplate.collectionExists(collection)) {
            logger.debug("Creating collection '{}'", collection);
            mongoTemplate.createCollection(collection);
        }
        final IndexOperations operations = mongoTemplate.indexOps(classObject);
        resolver
            .resolveIndexFor(classObject)
            .forEach(operations::ensureIndex);
    }
}
