package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.CompanyModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CompanyRepository extends MongoRepository<CompanyModel, String> {
}
