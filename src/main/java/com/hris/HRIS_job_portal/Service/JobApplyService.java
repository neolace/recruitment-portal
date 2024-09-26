package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.JobApplicantDTO;
import com.hris.HRIS_job_portal.Model.JobApplyModel;
import com.hris.HRIS_job_portal.Repository.JobApplyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobApplyService {

    @Autowired
    private JobApplyRepository jobApplyRepository;

    public List<JobApplyModel> getAllJobApply() {
        return jobApplyRepository.findAll();
    }

    public Optional<List<JobApplyModel>> getJobApplyByCompanyId(String companyId) {
        return jobApplyRepository.findAllByCompanyId(companyId);
    }

    public Optional<List<JobApplyModel>> getJobApplyByJobId(String jobId) {
        return jobApplyRepository.findAllByJobId(jobId);
    }

    public JobApplyModel addJobApply(JobApplyModel jobApply) {
        return jobApplyRepository.save(jobApply);
    }

    public JobApplicantDTO getSingleJobApplyByJobId(String companyId, String applicantId) {
        Optional<List<JobApplyModel>> jobApplyList = jobApplyRepository.findAllByCompanyId(companyId);

        if (jobApplyList.isPresent()) {
            JobApplyModel jobApplyModel = jobApplyList.get().get(0);

            return jobApplyModel.getApplicants().stream()
                    .filter(applicant -> applicant.getId().equals(applicantId))
                    .findFirst()
                    .orElse(null);
        }

        return null;
    }

    public JobApplicantDTO updateSingleJobApply(String companyId, String applicantId, JobApplicantDTO updatedJobApply) {
        Optional<List<JobApplyModel>> jobApplyList = jobApplyRepository.findAllByCompanyId(companyId);

        if (jobApplyList.isPresent()) {
            JobApplyModel jobApplyModel = jobApplyList.get().get(0);

            List<JobApplicantDTO> applicantList = jobApplyModel.getApplicants();
            for (int i = 0; i < applicantList.size(); i++) {
                JobApplicantDTO applicant = applicantList.get(i);

                if (applicant.getId().equals(applicantId)) {
                    applicantList.set(i, updatedJobApply);
                    return updatedJobApply;
                }
            }
        }
        return null;
    }

    public void deleteSingleJobApply(String companyId, String applicantId) {
        Optional<List<JobApplyModel>> jobApplyList = jobApplyRepository.findAllByCompanyId(companyId);

        if (jobApplyList.isPresent()) {
            JobApplyModel jobApplyModel = jobApplyList.get().get(0);

            List<JobApplicantDTO> applicantList = jobApplyModel.getApplicants();
            applicantList.removeIf(applicant -> applicant.getId().equals(applicantId));

            jobApplyModel.setApplicants(applicantList);
            jobApplyRepository.save(jobApplyModel);
        }
    }
}
