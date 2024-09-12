package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/batch")
public class BatchController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmpContactService empContactService;

    @Autowired
    private EmpEducationService empEducationService;

    @Autowired
    private EmpSkillsService empSkillsService;

    @Autowired
    private EmpExperiencesService empExperiencesService;

    @GetMapping("/getEmployee/{id}")
    public Map<String, Object> getEmployee(@PathVariable String id) {
        Map<String, Object> response = new HashMap<>();
        response.put("employee", employeeService.getEmployee(id));
        response.put("empContact", empContactService.getEmpContactByEmployeeId(id));
        response.put("empEducation", empEducationService.getEmpEducationByEmployeeId(id));
        response.put("empSkills", empSkillsService.getEmpSkillsByEmployeeId(id));
        response.put("empExperiences", empExperiencesService.getEmpExperiencesByEmployeeId(id));
        return response;
    }
}
