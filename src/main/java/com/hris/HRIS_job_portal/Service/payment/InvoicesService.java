package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Model.payment.InvoicesModel;
import com.hris.HRIS_job_portal.Repository.payment.InvoiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoicesService {

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<InvoicesModel> getAllInvoices() { return invoiceRepository.findAll(); }

    public List<InvoicesModel> getInvoicesByCompanyId(String companyId) { return invoiceRepository.findByCompanyId(companyId); }
}
