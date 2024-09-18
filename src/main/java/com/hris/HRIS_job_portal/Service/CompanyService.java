package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CompanyModel;
import com.hris.HRIS_job_portal.Repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class CompanyService {
    @Autowired
    CompanyRepository companyRepository;

    public List<CompanyModel> getAllCompanies() {
        return companyRepository.findAll();
    }

    public List<CompanyModel> getCompaniesPaginated(int page, int size) {
        return companyRepository.findAll().stream().skip((long) page * size).limit(size).toList();
    }

    public CompanyModel getCompany(String id) {
        return companyRepository.findById(id).orElse(null);
    }

    public CompanyModel addCompany(CompanyModel company) {
        return companyRepository.save(company);
    }

    @Async
    public CompletableFuture<List<CompanyModel>> getAllCompaniesAsync() {
        List<CompanyModel> companies = getAllCompanies();
        return CompletableFuture.completedFuture(companies);
    }

    @Async
    public CompletableFuture<CompanyModel> getCompanyByIdAsync(String id) {
        CompanyModel company = getCompany(id);
        return CompletableFuture.completedFuture(company);
    }
}
