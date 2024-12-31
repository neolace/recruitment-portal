package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Model.payment.PrePaymentModel;
import com.hris.HRIS_job_portal.Repository.payment.PrePaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PrePaymentService {

    @Autowired
    PrePaymentRepository prePaymentRepository;

    public PrePaymentModel save(PrePaymentModel prePaymentModel) {
        return prePaymentRepository.save(prePaymentModel);
    }
}
