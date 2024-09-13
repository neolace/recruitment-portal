package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpExperiencesModel;
import com.hris.HRIS_job_portal.Repository.EmpExperiencesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpExperiencesService {

    @Autowired
    private EmpExperiencesRepository empExperiencesRepository;

    public List<EmpExperiencesModel> getEmpExperiencesByEmployeeId(String employeeId) {
        return empExperiencesRepository.findByEmployeeId(employeeId);
    }

    public EmpExperiencesModel addEmpExperiences(EmpExperiencesModel empExperiences) {
        return empExperiencesRepository.save(empExperiences);
    }

    public EmpExperiencesModel updateEmpExperiences(String id, EmpExperiencesModel empExperiences) {
        EmpExperiencesModel existingEmpExperiences = empExperiencesRepository.findById(id).orElse(null);
        if (existingEmpExperiences != null) {
            existingEmpExperiences.setEmployeeId(empExperiences.getEmployeeId());
            existingEmpExperiences.setExperiences(empExperiences.getExperiences());
            return empExperiencesRepository.save(existingEmpExperiences);
        }
        return null;
    }

    public void deleteEmpExperiences(String employeeId) {
        empExperiencesRepository.deleteByEmployeeId(employeeId);
    }

    @Async
    public CompletableFuture<List<EmpExperiencesModel>> getEmpExperiencesByEmployeeIdAsync(String employeeId) {
        // Fetch employees asynchronously
        List<EmpExperiencesModel> empExperiences = getEmpExperiencesByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empExperiences);
    }
}
