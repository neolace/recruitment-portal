package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.DTO.JobApplicantDTO;
import com.hris.HRIS_job_portal.Model.JobApplyModel;
import com.hris.HRIS_job_portal.Service.JobApplyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v2/cmp_job-apply")
public class JobApplyController {

    @Autowired
    private JobApplyService jobApplyService;

    @GetMapping("/getAll")
    public List<JobApplyModel> getAllJobApply() {
        return jobApplyService.getAllJobApply();
    }

    @GetMapping("/getByCompanyId/{companyId}")
    public Optional<List<JobApplyModel>> getJobApplyByCompanyId(@PathVariable String companyId) {
        return jobApplyService.getJobApplyByCompanyId(companyId);
    }

    @GetMapping("/getByJobId/{jobId}")
    public Optional<List<JobApplyModel>> getJobApplyByJobId(@PathVariable String jobId) {
        return jobApplyService.getJobApplyByJobId(jobId);
    }

    @PostMapping("/add")
    public JobApplyModel addJobApply(@RequestBody JobApplyModel jobApply) {
        return jobApplyService.addJobApply(jobApply);
    }

    @PostMapping("/addApplicant/{companyId}/{jobId}")
    public JobApplyModel addJobApplicant(@PathVariable String companyId,
                                         @PathVariable String jobId,
                                         @RequestBody JobApplicantDTO jobApplicant) {
        return jobApplyService.addJobApplicant(companyId, jobId, jobApplicant);
    }

    @GetMapping("/getSingleByCompanyId/{companyId}/jobApply/{applicantId}")
    public JobApplicantDTO getSingleJobApplyByJobId(@PathVariable String companyId, @PathVariable String applicantId) {
        return jobApplyService.getSingleJobApplyByJobId(companyId, applicantId);
    }

    @PutMapping("/updateByCompanyId/{companyId}/jobApply/{applicantId}")
    public JobApplicantDTO updateSingleJobApply(@PathVariable String companyId, @PathVariable String applicantId, @RequestBody JobApplicantDTO updatedJobApply) {
        return jobApplyService.updateSingleJobApply(companyId, applicantId, updatedJobApply);
    }

    @DeleteMapping("/deleteByCompanyId/{companyId}/jobApply/{applicantId}")
    public void deleteSingleJobApply(@PathVariable String companyId, @PathVariable String applicantId) {
        jobApplyService.deleteSingleJobApply(companyId, applicantId);
    }
}
