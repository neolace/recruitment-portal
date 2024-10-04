package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.SubscriptionsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SubscriptionRepository extends MongoRepository<SubscriptionsModel, String> {
    SubscriptionsModel findByCompanyId(String companyId);
}
