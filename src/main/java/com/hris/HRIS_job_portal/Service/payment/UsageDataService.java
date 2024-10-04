package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Model.payment.UsageDataModel;
import com.hris.HRIS_job_portal.Repository.payment.UsageDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsageDataService {

    @Autowired
    private UsageDataRepository usageDataRepository;

    public UsageDataModel getUsageData(String companyId) {
        return usageDataRepository.findByCompanyId(companyId);
    }
}

