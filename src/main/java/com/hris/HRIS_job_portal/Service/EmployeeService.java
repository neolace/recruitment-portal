package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmployeeModel> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public List<EmployeeModel> getEmployeesPaginated(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return employeeRepository.findAllBy(pageable);
    }

    public EmployeeModel getEmployee(String id) {
        return employeeRepository.findById(id).orElse(null);
    }

    public EmployeeModel addEmployee(EmployeeModel employee) {
        return employeeRepository.save(employee);
    }

    public EmployeeModel updateEmployee(EmployeeModel employee) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(employee.getId());
        if (employeeModel.isPresent()) {
            employeeRepository.save(employee);
        }
        return employee;
    }

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    @Async
    public CompletableFuture<List<EmployeeModel>> getAllEmployeesAsync() {
        // Fetch employees asynchronously
        List<EmployeeModel> employees = getAllEmployees();
        return CompletableFuture.completedFuture(employees);
    }

    @Async
    public CompletableFuture<EmployeeModel> getEmployeeByIdAsync(String id) {
        EmployeeModel employee = getEmployee(id);
        return CompletableFuture.completedFuture(employee);
    }

    @Async
    public CompletableFuture<EmployeeModel> createEmployeeAsync(EmployeeModel employee) {
        EmployeeModel savedEmployee = addEmployee(employee);
        return CompletableFuture.completedFuture(savedEmployee);
    }
}

