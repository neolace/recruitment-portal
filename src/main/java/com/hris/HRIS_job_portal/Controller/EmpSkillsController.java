package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.EmpSkillsModel;
import com.hris.HRIS_job_portal.Service.EmpSkillsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/emp_skills")
public class EmpSkillsController {

    @Autowired
    private EmpSkillsService empSkillsService;

    @GetMapping("/getByEmployeeId/{employeeId}")
    public List<EmpSkillsModel> getEmpSkillsByEmployeeId(@PathVariable String employeeId) {
        return empSkillsService.getEmpSkillsByEmployeeId(employeeId);
    }

    @PostMapping("/add")
    public EmpSkillsModel addEmpSkills(@RequestBody EmpSkillsModel empSkills) {
        return empSkillsService.addEmpSkills(empSkills);
    }

    @PutMapping("/update/{id}")
    public EmpSkillsModel updateEmpSkills(@PathVariable String id, @RequestBody EmpSkillsModel empSkills) {
        return empSkillsService.updateEmpSkills(id, empSkills);
    }

    @DeleteMapping("/delete/{employeeId}")
    public void deleteEmpSkills(@PathVariable String employeeId) {
        empSkillsService.deleteEmpSkills(employeeId);
    }
}
