package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CmpPostedJobsModel;
import com.hris.HRIS_job_portal.Repository.CmpPostedJobsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
