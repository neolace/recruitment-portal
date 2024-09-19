package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CmpSocialModel;
import com.hris.HRIS_job_portal.Model.CompanyModel;
import com.hris.HRIS_job_portal.Repository.CmpSocialRepository;
import com.hris.HRIS_job_portal.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class CmpSocialService {

    @Autowired
    CmpSocialRepository cmpSocialRepository;

    @Autowired
    CompanyRepository companyRepository;

    public List<CmpSocialModel> getCmpSocialsByCompanyId(String companyId) {
        return cmpSocialRepository.findByCompanyId(companyId);
    }

    public CmpSocialModel addCmpSocials(CmpSocialModel cmpSocials) {
        List<CmpSocialModel> cmpSocialsList = cmpSocialRepository.findByCompanyId(cmpSocials.getCompanyId());

        CmpSocialModel cmpSocialsModel;

        if (!cmpSocialsList.isEmpty()) {
            // Use the first CmpSocialModel if it exists (assuming only one entry should exist)
            cmpSocialsModel = cmpSocialsList.get(0);

            // Append the new cmpSocials from the incoming cmpSocials object
            cmpSocialsModel.setSocialLinks(cmpSocials.getSocialLinks());
        } else {
            // If no cmpSocials exist, create a new CmpSocialModel entry
            cmpSocialsModel = cmpSocialRepository.save(cmpSocials);
        }

        // Save the updated CmpSocialModel to the repository
        cmpSocialRepository.save(cmpSocialsModel);

        Optional<CompanyModel> companyModel = companyRepository.findById(cmpSocials.getCompanyId());

        if (companyModel.isPresent()) {
            CompanyModel existingCompany = companyModel.get();
            existingCompany.setSocialLinks(cmpSocialsModel.getId());
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingCompany.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>();
            }
            profileCompleted.put("cmpSocial", true);
            existingCompany.setProfileCompleted(profileCompleted);
            companyRepository.save(existingCompany);
        }
        return cmpSocialsModel;
    }


    @Async
    public CompletableFuture<List<CmpSocialModel>> getCmpSocialsByCompanyIdAsync(String companyId) {
        List<CmpSocialModel> cmpSocialsList = cmpSocialRepository.findByCompanyId(companyId);

        return CompletableFuture.completedFuture(cmpSocialsList);
    }
}
