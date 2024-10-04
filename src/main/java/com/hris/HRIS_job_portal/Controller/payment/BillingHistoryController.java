package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingHistoryModel;
import com.hris.HRIS_job_portal.Service.payment.BillingHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billing/history")
public class BillingHistoryController {

    @Autowired
    private BillingHistoryService billingHistoryService;

    @GetMapping("/{companyId}")
    public ResponseEntity<List<BillingHistoryModel>> getBillingHistory(@PathVariable String companyId) {
        List<BillingHistoryModel> billingHistory = billingHistoryService.getBillingHistory(companyId);
        return ResponseEntity.ok(billingHistory);
    }
}

