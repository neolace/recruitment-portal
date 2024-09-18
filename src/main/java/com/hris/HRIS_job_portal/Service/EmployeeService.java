package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.FavJobDTO;
import com.hris.HRIS_job_portal.Model.CredentialsModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.CredentialsRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private CredentialsRepository credentialsRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

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
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setFirstname(employee.getFirstname());
            existingEmployee.setLastname(employee.getLastname());
            existingEmployee.setEmail(employee.getEmail());
            existingEmployee.setOccupation(employee.getOccupation());
            existingEmployee.setDob(employee.getDob());
            existingEmployee.setIntro(employee.getIntro());

            // Handle null profileCompleted
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }

            // Update profileCompleted
            profileCompleted.put("occupation", employee.getOccupation() != null && !employee.getOccupation().isEmpty());
            profileCompleted.put("intro", employee.getIntro() != null && !employee.getIntro().isEmpty());
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return employee;
    }

    public EmployeeModel updateNotifications(EmployeeModel employee) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(employee.getId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            if (existingEmployee.getAccountNotifications() == null) {
                existingEmployee.setAccountNotifications(new HashMap<>());
            }
            if (existingEmployee.getMarketingNotifications() == null) {
                existingEmployee.setMarketingNotifications(new HashMap<>());
            }
            existingEmployee.setAccountNotifications(employee.getAccountNotifications());
            existingEmployee.setMarketingNotifications(employee.getMarketingNotifications());
            employeeRepository.save(existingEmployee);
        }
        return employee;
    }

    public EmployeeModel updateProfilePic(EmployeeModel employee) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(employee.getId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setImage(employee.getImage());

            // Handle null profileCompleted
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }

            // Update profilePic in profileCompleted
            profileCompleted.put("profilePic", employee.getImage() != null && !employee.getImage().isEmpty());
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return employee;
    }

    public EmployeeModel updateCoverPic(EmployeeModel employee) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(employee.getId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setCoverImage(employee.getCoverImage());

            // Handle null profileCompleted
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }

            // Update coverPic in profileCompleted
            profileCompleted.put("coverPic", employee.getCoverImage() != null && !employee.getCoverImage().isEmpty());
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return employee;
    }

    public EmployeeModel updateResume(EmployeeModel employee) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(employee.getId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setResume(employee.getResume());

            // Handle null profileCompleted
            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }

            // Update resume in profileCompleted
            profileCompleted.put("resume", employee.getResume() != null && !employee.getResume().isEmpty());
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return employee;
    }

    public EmployeeModel saveFavoriteJob(String empId, FavJobDTO jobDTO) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empId);
        if (employeeModel.isPresent()) {
            EmployeeModel employee = employeeModel.get();
            List<FavJobDTO> favJobs = employee.getSavedJobs();
            if (favJobs == null) {
                favJobs = new ArrayList<>();
            }
            favJobs.add(jobDTO);
            employee.setSavedJobs(favJobs);
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found for id: " + empId);
        }
    }

    public EmployeeModel removeFavoriteJob(String empId, String jobId) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empId);
        if (employeeModel.isPresent()) {
            EmployeeModel employee = employeeModel.get();
            List<FavJobDTO> favJobs = employee.getSavedJobs();
            if (favJobs == null) {
                favJobs = new ArrayList<>();
            }
            favJobs.removeIf(job -> job.getJobId().equals(jobId));
            employee.setSavedJobs(favJobs);
            return employeeRepository.save(employee);
        } else {
            throw new RuntimeException("Employee not found for id: " + empId);
        }
    }

    public EmployeeModel changeFavoriteJobStatus(String empId, FavJobDTO jobDto) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empId);
        if (employeeModel.isPresent()) {
            EmployeeModel employee = employeeModel.get();
            List<FavJobDTO> favJobs = employee.getSavedJobs();
            if (favJobs == null) {
                favJobs = new ArrayList<>();
            }
            for (FavJobDTO favJob : favJobs) {
                if (favJob.getJobId().equals(jobDto.getJobId())) {
                    favJob.setStatus(jobDto.getStatus());
                    return employeeRepository.save(employee);
                }
            }
        } else {
            throw new RuntimeException("Employee not found for id: " + empId);
        }
        return null;
    }

    public void deleteEmployee(String id) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(id);
        Optional<CredentialsModel> credentialsModel = credentialsRepository.findByEmployeeId(id);
        if (employeeModel.isPresent() && credentialsModel.isPresent()) {
            EmployeeModel employee = employeeModel.get();
            CredentialsModel credentials = credentialsModel.get();
            employeeRepository.delete(employee);
            credentialsRepository.delete(credentials);
        } else {
            throw new RuntimeException("Employee not found for id: " + id);
        }
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

