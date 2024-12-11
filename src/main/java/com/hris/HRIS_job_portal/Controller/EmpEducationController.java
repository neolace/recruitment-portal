package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.DTO.EmpEducationDTO;
import com.hris.HRIS_job_portal.DTO.EmpExperiencesDTO;
import com.hris.HRIS_job_portal.Model.EmpEducationModel;
import com.hris.HRIS_job_portal.Model.EmpExperiencesModel;
import com.hris.HRIS_job_portal.Service.EmpEducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/emp_education")
public class EmpEducationController {

    @Autowired
    private EmpEducationService empEducationService;

    @GetMapping("/getByEmployeeId/{employeeId}")
    public List<EmpEducationModel> getEmpEducationByEmployeeId(@PathVariable String employeeId) {
        return empEducationService.getEmpEducationByEmployeeId(employeeId);
    }

    @PostMapping("/add")
    public EmpEducationModel addEmpEducation(@RequestBody EmpEducationModel empEducation) {
        return empEducationService.addEmpEducation(empEducation);
    }

    @PutMapping("/update/{id}")
    public EmpEducationModel updateEmpEducation(@PathVariable String id, @RequestBody EmpEducationModel empEducation) {
        return empEducationService.updateEmpEducation(id, empEducation);
    }

    @PutMapping("/edit-single/{employeeId}")
    public EmpEducationModel updateEmpEducation(@PathVariable String employeeId, @RequestBody EmpEducationDTO empEducations) {
        return empEducationService.editEmpEducation(employeeId, empEducations);
    }

    @DeleteMapping("/delete/{employeeId}")
    public void deleteEmpEducation(@PathVariable String employeeId) {
        empEducationService.deleteEmpEducations(employeeId);
    }

    @DeleteMapping("/delete-single/{employeeId}/{educationId}")
    public void deleteEmpEducations(@PathVariable String employeeId, @PathVariable String educationId) {
        empEducationService.deleteEmpEducation(employeeId, educationId);
    }
}
