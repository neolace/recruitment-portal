package com.hris.HRIS_job_portal.Repository.payment;

import com.hris.HRIS_job_portal.Model.payment.InvoicesModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface InvoiceRepository extends MongoRepository<InvoicesModel, String> {
    List<InvoicesModel> findByCompanyId(String companyId);
}
