package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingHistoryModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BillingHistoryRepository extends MongoRepository<BillingHistoryModel, String> {
    List<BillingHistoryModel> findByCompanyId(String companyId);
}

