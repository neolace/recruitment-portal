package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpSkillsModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpSkillsRepository;
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
public class EmpSkillsService {

    @Autowired
    private EmpSkillsRepository empSkillsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmpSkillsModel> getEmpSkillsByEmployeeId(String employeeId) {
        return empSkillsRepository.findByEmployeeId(employeeId);
    }

    public EmpSkillsModel addEmpSkills(EmpSkillsModel empSkills) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empSkills.getEmployeeId());
        EmpSkillsModel empSkillsModel = empSkillsRepository.save(empSkills);

        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setSkills(empSkillsModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }
            profileCompleted.put("skills", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return empSkillsModel;
    }

    public EmpSkillsModel updateEmpSkills(String id, EmpSkillsModel empSkills) {
        EmpSkillsModel existingEmpSkills = empSkillsRepository.findById(id).orElse(null);
        if (existingEmpSkills != null) {
            existingEmpSkills.setEmployeeId(empSkills.getEmployeeId());
            existingEmpSkills.setSkills(empSkills.getSkills());
            return empSkillsRepository.save(existingEmpSkills);
        }
        return null;
    }

    public void deleteEmpSkills(String employeeId) {
        empSkillsRepository.deleteByEmployeeId(employeeId);
    }

    @Async
    public CompletableFuture<List<EmpSkillsModel>> getEmpSkillsByEmployeeIdAsync(String employeeId) {
        // Fetch employees asynchronously
        List<EmpSkillsModel> empSkills = getEmpSkillsByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empSkills);
    }
}
