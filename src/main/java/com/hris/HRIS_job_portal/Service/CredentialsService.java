package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CredentialsModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.CredentialsRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class CredentialsService {

    @Autowired
    private CredentialsRepository credentialsRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public CredentialsModel addCredentials(CredentialsModel credentials) {
        Optional<CredentialsModel> optionalCredentials = Optional.ofNullable(credentialsRepository.findByEmail(credentials.getEmail()));
        if (optionalCredentials.isPresent()) {
            return null;
        } else {
            EmployeeModel emp = new EmployeeModel();
            emp.setFirstname(credentials.getFirstname());
            emp.setLastname(credentials.getLastname());
            emp.setEmail(credentials.getEmail());

            Map<String, Boolean> profileCompleted = new HashMap<>();
            profileCompleted.put("name", true);
            profileCompleted.put("email", true);
            profileCompleted.put("resume", false);
            profileCompleted.put("occupation", false);
            profileCompleted.put("profilePic", false);
            profileCompleted.put("coverPic", false);
            profileCompleted.put("intro", false);
            profileCompleted.put("skills", false);
            profileCompleted.put("experiences", false);
            profileCompleted.put("education", false);
            profileCompleted.put("contactInfo", false);
            profileCompleted.put("socialLinks", false);
            emp.setProfileCompleted(profileCompleted);

            EmployeeModel savedEmp = employeeRepository.save(emp);

            credentials.setEmployeeId(savedEmp.getId());

            return credentialsRepository.save(credentials);
        }
    }

    public Iterable<CredentialsModel> getAllCredentials() {
        return credentialsRepository.findAll();
    }

    public Optional<CredentialsModel> getCredentials(String employeeId) {
        return credentialsRepository.findByEmployeeId(employeeId);
    }

    public CredentialsModel getCredentialsByEmail(String email) {
        return credentialsRepository.findByEmail(email);
    }

    public Optional<CredentialsModel> getCredentialsByEmployeeId(String employeeId) {
        return credentialsRepository.findByEmployeeId(employeeId);
    }

    public CredentialsModel updateCredentials(String employeeId, CredentialsModel credentials) {
        Optional<CredentialsModel> optionalCredentials = credentialsRepository.findById(credentials.getId());
        if (optionalCredentials.isPresent()) {
            CredentialsModel credentials1 = optionalCredentials.get();
            credentials1.setEmployeeId(employeeId);
            credentials1.setFirstname(credentials.getFirstname());
            credentials1.setLastname(credentials.getLastname());
            credentials1.setEmail(credentials.getEmail());
            credentials1.setPassword(credentials.getPassword());
            credentials1.setRole(credentials.getRole());
            return credentialsRepository.save(credentials1);
        }
        return null;
    }

    public CredentialsModel deleteCredentials(String employeeId) {
        return credentialsRepository.deleteByEmployeeId(employeeId);
    }
}
