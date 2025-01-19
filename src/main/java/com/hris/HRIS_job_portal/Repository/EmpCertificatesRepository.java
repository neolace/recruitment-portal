package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpCertificatesModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmpCertificatesRepository extends MongoRepository<EmpCertificatesModel, String> {
    List<EmpCertificatesModel> findByEmployeeId(String employeeId);
    void deleteByEmployeeId(String employeeId);
}
