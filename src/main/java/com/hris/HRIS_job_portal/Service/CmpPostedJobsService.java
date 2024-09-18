package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CmpPostedJobsModel;
import com.hris.HRIS_job_portal.Repository.CmpPostedJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class CmpPostedJobsService {
    @Autowired
    CmpPostedJobsRepository cmpPostedJobsRepository;

    public List<CmpPostedJobsModel> getCmpPostedJobsByCompanyId(String companyId) {
        return cmpPostedJobsRepository.findByCompanyId(companyId);
    }

    public CmpPostedJobsModel addCmpPostedJobs(CmpPostedJobsModel cmpPostedJobs) {
        return cmpPostedJobsRepository.save(cmpPostedJobs);
    }


    @Async
    public CompletableFuture<List<CmpPostedJobsModel>> getCmpPostedJobsByCompanyIdAsync(String companyId) {
        List<CmpPostedJobsModel> cmpPostedJobsList = cmpPostedJobsRepository.findByCompanyId(companyId);

        return CompletableFuture.completedFuture(cmpPostedJobsList);
    }
}
