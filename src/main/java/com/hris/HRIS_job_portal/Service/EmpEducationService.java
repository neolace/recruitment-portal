package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpEducationModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpEducationRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpEducationService {

    @Autowired
    private EmpEducationRepository empEducationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmpEducationModel> getEmpEducationByEmployeeId(String employeeId) {
        return empEducationRepository.findByEmployeeId(employeeId);
    }

    public EmpEducationModel addEmpEducation(EmpEducationModel empEducation) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empEducation.getEmployeeId());
        EmpEducationModel empEducationModel = empEducationRepository.save(empEducation);

        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setEducation(empEducationModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }
            profileCompleted.put("education", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return empEducationModel;
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
