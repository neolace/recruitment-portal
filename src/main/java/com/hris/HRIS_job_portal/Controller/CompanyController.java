package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.CompanyModel;
import com.hris.HRIS_job_portal.Service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/company")
public class CompanyController {
    @Autowired
    CompanyService companyService;

    @GetMapping("/all")
    public List<CompanyModel> getAllCompanies() {
        return companyService.getAllCompanies();
    }

    @GetMapping("/getAll")
    public List<CompanyModel> getAllCompanies(@RequestParam int page, @RequestParam int size) {
        return companyService.getCompaniesPaginated(page, size);
    }

    @GetMapping("/get/{id}")
    public CompanyModel getCompany(@PathVariable String id) {
        return companyService.getCompany(id);
    }

    @PostMapping("/add")
    public CompanyModel addCompany(@RequestBody CompanyModel company) {
        return companyService.addCompany(company);
    }

    @PutMapping("/update/updateLogo")
    public CompanyModel updateLogoPic(@RequestBody CompanyModel company) {
        return companyService.updateLogoPic(company);
    }

    @PutMapping("/update/updateCover")
    public CompanyModel updateCoverPic(@RequestBody CompanyModel company) {
        return companyService.updateCoverPic(company);
    }

    @PutMapping("/update/updateThumb1")
    public CompanyModel updateThumb1Pic(@RequestBody CompanyModel company) {
        return companyService.updateThumb1Pic(company);
    }

    @PutMapping("/update/updateThumb2")
    public CompanyModel updateThumb2Pic(@RequestBody CompanyModel company) {
        return companyService.updateThumb2Pic(company);
    }

    @PutMapping("/update/updateThumb3")
    public CompanyModel updateThumb3Pic(@RequestBody CompanyModel company) {
        return companyService.updateThumb3Pic(company);
    }

    @PutMapping("/update")
    public CompanyModel updateCompany(@RequestBody CompanyModel company) {
        return companyService.updateCompany(company);
    }
}
