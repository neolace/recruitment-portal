package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.UsageDataModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UsageDataRepository extends MongoRepository<UsageDataModel, String> {
    UsageDataModel findByCompanyId(String companyId);
}
