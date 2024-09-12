package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpSkillsModel;
import com.hris.HRIS_job_portal.Repository.EmpSkillsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpSkillsService {

    @Autowired
    private EmpSkillsRepository empSkillsRepository;

    public List<EmpSkillsModel> getEmpSkillsByEmployeeId(String employeeId) {
        return empSkillsRepository.findByEmployeeId(employeeId);
    }

    public EmpSkillsModel addEmpSkills(EmpSkillsModel empSkills) {
        return empSkillsRepository.save(empSkills);
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
}
