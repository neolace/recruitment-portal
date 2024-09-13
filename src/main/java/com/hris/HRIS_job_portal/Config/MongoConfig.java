package com.hris.HRIS_job_portal.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.index.Index;


@Configuration
public class MongoConfig {

    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory mongoDbFactory,
                                       MappingMongoConverter mappingMongoConverter) {
        MongoTemplate mongoTemplate = new MongoTemplate(mongoDbFactory, mappingMongoConverter);

        mongoTemplate.indexOps("portal_employees").ensureIndex(new Index().on("email", Sort.Direction.ASC).unique());
        mongoTemplate.indexOps("portal_employees").ensureIndex(new Index().on("occupation", Sort.Direction.ASC));

        return mongoTemplate;
    }
}
