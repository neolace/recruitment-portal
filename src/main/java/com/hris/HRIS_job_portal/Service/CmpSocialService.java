package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CmpSocialModel;
import com.hris.HRIS_job_portal.Repository.CmpSocialRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class CmpSocialService {

    @Autowired
    CmpSocialRepository cmpSocialRepository;

    public List<CmpSocialModel> getCmpSocialsByCompanyId(String companyId) {
        return cmpSocialRepository.findByCompanyId(companyId);
    }

    public CmpSocialModel addCmpSocials(CmpSocialModel cmpSocials) {
        return cmpSocialRepository.save(cmpSocials);
    }


    @Async
    public CompletableFuture<List<CmpSocialModel>> getCmpSocialsByCompanyIdAsync(String companyId) {
        List<CmpSocialModel> cmpSocialsList = cmpSocialRepository.findByCompanyId(companyId);

        return CompletableFuture.completedFuture(cmpSocialsList);
    }
}
