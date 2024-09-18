package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.CmpPostedJobsModel;
import com.hris.HRIS_job_portal.Service.CmpPostedJobsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/cmp_posted_jobs")
public class CmpPostedJobsController {

    @Autowired
    CmpPostedJobsService cmpPostedJobsService;

    @GetMapping("/getByCompanyId/{companyId}")
    public List<CmpPostedJobsModel> getCmpPostedJobsByCompanyId(@PathVariable String companyId) {
        return cmpPostedJobsService.getCmpPostedJobsByCompanyId(companyId);
    }

    @PostMapping("/add")
    public CmpPostedJobsModel addCmpPostedJobs(@RequestBody CmpPostedJobsModel cmpPostedJobs) {
        return cmpPostedJobsService.addCmpPostedJobs(cmpPostedJobs);
    }
}
