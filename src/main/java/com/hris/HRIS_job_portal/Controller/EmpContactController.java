package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.EmpContactModel;
import com.hris.HRIS_job_portal.Service.EmpContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/emp_contact")
public class EmpContactController {

    @Autowired
    private EmpContactService empContactService;

    @GetMapping("/getByEmployeeId/{employeeId}")
    public List<EmpContactModel> getEmpContactByEmployeeId(@PathVariable String employeeId) {
        return empContactService.getEmpContactByEmployeeId(employeeId);
    }

    @PostMapping("/add")
    public EmpContactModel addEmpContact(@RequestBody EmpContactModel empContact) {
        return empContactService.addEmpContact(empContact);
    }

    @PostMapping("/add-social")
    public EmpContactModel addSocialLinks(@RequestBody EmpContactModel socialLinks) {
        return empContactService.AddEmpSocialLinks(socialLinks);
    }

    @PutMapping("/update/{id}")
    public EmpContactModel updateEmpContact(@PathVariable String id, @RequestBody EmpContactModel empContact) {
        return empContactService.updateEmpContact(id, empContact);
    }

    @DeleteMapping("/delete/{employeeId}")
    public void deleteEmpContact(@PathVariable String employeeId) {
        empContactService.deleteEmpContact(employeeId);
    }
}
