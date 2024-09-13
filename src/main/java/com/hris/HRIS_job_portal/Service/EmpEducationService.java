package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpEducationModel;
import com.hris.HRIS_job_portal.Repository.EmpEducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpEducationService {

    @Autowired
    private EmpEducationRepository empEducationRepository;

    public List<EmpEducationModel> getEmpEducationByEmployeeId(String employeeId) {
        return empEducationRepository.findByEmployeeId(employeeId);
    }

    public EmpEducationModel addEmpEducation(EmpEducationModel empEducation) {
        return empEducationRepository.save(empEducation);
    }

    public EmpEducationModel updateEmpEducation(String id, EmpEducationModel empEducation) {
        EmpEducationModel existingEmpEducation = empEducationRepository.findById(id).orElse(null);
        if (existingEmpEducation != null) {
            existingEmpEducation.setEmployeeId(empEducation.getEmployeeId());
            existingEmpEducation.setEducation(empEducation.getEducation());
            return empEducationRepository.save(existingEmpEducation);
        }
        return null;
    }

    public void deleteEmpEducation(String employeeId) {
        empEducationRepository.deleteByEmployeeId(employeeId);
    }

    @Async
    public CompletableFuture<List<EmpEducationModel>> getEmpEducationByEmployeeIdAsync(String employeeId) {
        // Fetch employees asynchronously
        List<EmpEducationModel> empEducations = getEmpEducationByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empEducations);
    }
}
