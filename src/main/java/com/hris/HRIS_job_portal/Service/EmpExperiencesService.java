package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpExperiencesModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpExperiencesRepository;
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
public class EmpExperiencesService {

    @Autowired
    private EmpExperiencesRepository empExperiencesRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmpExperiencesModel> getEmpExperiencesByEmployeeId(String employeeId) {
        return empExperiencesRepository.findByEmployeeId(employeeId);
    }

    public EmpExperiencesModel addEmpExperiences(EmpExperiencesModel empExperiences) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empExperiences.getEmployeeId());
        EmpExperiencesModel empExperiencesModel = empExperiencesRepository.save(empExperiences);

        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setExperiences(empExperiencesModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }
            profileCompleted.put("experiences", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return empExperiencesModel;
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
