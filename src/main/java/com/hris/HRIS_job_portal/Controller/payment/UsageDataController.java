package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.UsageDataModel;
import com.hris.HRIS_job_portal.Service.payment.UsageDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/usage")
public class UsageDataController {

    @Autowired
    private UsageDataService usageDataService;

    @GetMapping("/get/{companyId}")
    public ResponseEntity<UsageDataModel> getUsageData(@PathVariable String companyId) {
        UsageDataModel usageData = usageDataService.getUsageData(companyId);
        if (usageData != null) {
            return ResponseEntity.ok(usageData);
        }
        return ResponseEntity.notFound().build();
    }
}
