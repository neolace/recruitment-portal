package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public EmployeeModel getEmployee(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public EmployeeModel updateEmployee(EmployeeModel employee) {
        return employeeRepository.save(employee);
    }

    public EmployeeModel addSkills(EmployeeModel employee) {
        // Logic to add skills (e.g., updating employee skills)
        return employeeRepository.save(employee);
    }

    public String deleteEmployee(String id) {
        employeeRepository.deleteById(id);
        return "Employee deleted with id: " + id;
    }
}

