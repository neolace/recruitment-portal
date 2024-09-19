package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.CmpSocialModel;
import com.hris.HRIS_job_portal.Service.CmpSocialService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/cmp_socials")
public class CmpSocialController {

    @Autowired
    CmpSocialService cmpSocialService;

    @GetMapping("/getByCompanyId/{companyId}")
    public List<CmpSocialModel> getCmpSocialsByCompanyId(@PathVariable String companyId) {
        return cmpSocialService.getCmpSocialsByCompanyId(companyId);
    }

    @PostMapping("/add")
    public CmpSocialModel addCmpSocials(@RequestBody CmpSocialModel cmpSocials) {
        return cmpSocialService.addCmpSocials(cmpSocials);
    }
}
