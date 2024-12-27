package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingHistoryModel;
import com.hris.HRIS_job_portal.Repository.payment.BillingHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BillingHistoryService {

    @Autowired
    private BillingHistoryRepository billingHistoryRepository;

    public List<BillingHistoryModel> getBillingHistory(String companyId) {
        return billingHistoryRepository.findByCompanyId(companyId);
    }

    public BillingHistoryModel save(BillingHistoryModel billingHistory) {
        return billingHistoryRepository.save(billingHistory);
    }
}

