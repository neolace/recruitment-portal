package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.FeatureModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface FeatureRepository extends MongoRepository<FeatureModel, String> {
}
