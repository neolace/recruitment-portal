package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpContactModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpContactRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpContactService {

    @Autowired
    private EmpContactRepository empContactRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    public List<EmpContactModel> getEmpContactByEmployeeId(String employeeId) {
        return empContactRepository.findByEmployeeId(employeeId);
    }

    public EmpContactModel addEmpContact(EmpContactModel empContact) {
        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empContact.getEmployeeId());
        EmpContactModel empContactModel = empContactRepository.save(empContact);

        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setContactInfo(empContactModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>(); // Initialize if null
            }
            profileCompleted.put("contactInfo", empContactModel.getContact() != null && !empContactModel.getContact().isEmpty());
            profileCompleted.put("socialLinks", empContactModel.getSocialLinks() != null && !empContactModel.getSocialLinks().isEmpty());
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);
        }
        return empContactModel;
    }

    public EmpContactModel updateEmpContact(String id, EmpContactModel empContact) {
        EmpContactModel existingEmpContact = empContactRepository.findById(id).orElse(null);
        if (existingEmpContact != null) {
            existingEmpContact.setEmployeeId(empContact.getEmployeeId());
            existingEmpContact.setContact(empContact.getContact());
            existingEmpContact.setSocialLinks(empContact.getSocialLinks());
            return empContactRepository.save(existingEmpContact);
        }
        return null;
    }

    public void deleteEmpContact(String employeeId) {
        empContactRepository.deleteByEmployeeId(employeeId);
    }

    @Async
    public CompletableFuture<List<EmpContactModel>> getEmpContactByEmployeeIdAsync(String employeeId) {
        // Fetch employees asynchronously
        List<EmpContactModel> empContacts = getEmpContactByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empContacts);
    }
}
