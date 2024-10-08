package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.PaymentMethodsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PaymentMethodRepository extends MongoRepository<PaymentMethodsModel, String> {
    List<PaymentMethodsModel> findByCompanyId(String companyId);
}
