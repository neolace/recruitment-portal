package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingAddressModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface BillingAddressRepository extends MongoRepository<BillingAddressModel, String> {
    List<BillingAddressModel> findByCompanyId(String companyId);
}
