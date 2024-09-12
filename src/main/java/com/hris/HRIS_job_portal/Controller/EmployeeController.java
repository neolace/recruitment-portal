package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/getAll")
    public List<EmployeeModel> getAllEmployees() {
        return employeeService.getAllEmployees();
    }

    @GetMapping("/get/{id}")
    public EmployeeModel getEmployee(@PathVariable String id) {
        return employeeService.getEmployee(id);
    }

    @PostMapping("/update")
    public EmployeeModel updateEmployee(@RequestBody EmployeeModel employee) {
        return employeeService.updateEmployee(employee);
    }

    @PostMapping("/addSkills")
    public EmployeeModel addSkills(@RequestBody EmployeeModel employee) {
        return employeeService.addSkills(employee);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteEmployee(@PathVariable String id) {
        return employeeService.deleteEmployee(id);
    }
}
