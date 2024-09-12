package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.EmpContactModel;
import com.hris.HRIS_job_portal.Repository.EmpContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmpContactService {

    @Autowired
    private EmpContactRepository empContactRepository;

    public List<EmpContactModel> getEmpContactByEmployeeId(String employeeId) {
        return empContactRepository.findByEmployeeId(employeeId);
    }

    public EmpContactModel addEmpContact(EmpContactModel empContact) {
        return empContactRepository.save(empContact);
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
}
