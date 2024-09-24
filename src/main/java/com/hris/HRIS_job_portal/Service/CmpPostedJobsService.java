package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.PostedJobsDTO;
import com.hris.HRIS_job_portal.Model.CmpPostedJobsModel;
import com.hris.HRIS_job_portal.Model.CompanyModel;
import com.hris.HRIS_job_portal.Repository.CmpPostedJobsRepository;
import com.hris.HRIS_job_portal.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class CmpPostedJobsService {
    @Autowired
    CmpPostedJobsRepository cmpPostedJobsRepository;

    @Autowired
    CompanyRepository companyRepository;

    public List<CmpPostedJobsModel> getCmpPostedJobsByCompanyId(String companyId) {
        return cmpPostedJobsRepository.findByCompanyId(companyId);
    }

    public List<CmpPostedJobsModel> getAllCmpPostedJobs() {
        return cmpPostedJobsRepository.findAll();
    }

    public CmpPostedJobsModel addCmpPostedJobs(CmpPostedJobsModel cmpPostedJobs) {
        List<CmpPostedJobsModel> cmpPostedJobsList = cmpPostedJobsRepository.findByCompanyId(cmpPostedJobs.getCompanyId());

        CmpPostedJobsModel cmpPostedJobsModel;

        if (!cmpPostedJobsList.isEmpty()) {
            // Use the first CmpPostedJobsModel if it exists (assuming only one entry should exist)
            cmpPostedJobsModel = cmpPostedJobsList.get(0);

            List<PostedJobsDTO> postedJobs = cmpPostedJobsModel.getPostedJobs();
            if (postedJobs == null) {
                postedJobs = new ArrayList<>();
            }

            // Append the new postedJobs from the incoming cmpPostedJobs object
            postedJobs.addAll(cmpPostedJobs.getPostedJobs());

            cmpPostedJobsModel.setPostedJobs(postedJobs);
        } else {
            // If no postedJobs exist, create a new CmpPostedJobsModel entry
            cmpPostedJobsModel = cmpPostedJobsRepository.save(cmpPostedJobs);
        }

        // Save the updated CmpPostedJobsModel to the repository
        cmpPostedJobsRepository.save(cmpPostedJobsModel);

        // Now update the CompanyModel to reference the cmpPostedJobsModel ID (if needed)
        Optional<CompanyModel> companyModel = companyRepository.findById(cmpPostedJobs.getCompanyId());
        if (companyModel.isPresent()) {
            CompanyModel existingCompany = companyModel.get();
            existingCompany.setPostedJobs(cmpPostedJobsModel.getId());

            companyRepository.save(existingCompany);
        }

        return cmpPostedJobsModel;
    }


    @Async
    public CompletableFuture<List<CmpPostedJobsModel>> getCmpPostedJobsByCompanyIdAsync(String companyId) {
        List<CmpPostedJobsModel> cmpPostedJobsList = cmpPostedJobsRepository.findByCompanyId(companyId);

        return CompletableFuture.completedFuture(cmpPostedJobsList);
    }
}
