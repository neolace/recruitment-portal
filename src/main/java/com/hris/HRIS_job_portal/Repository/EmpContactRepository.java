package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpContactModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpContactRepository extends MongoRepository<EmpContactModel, String> {
    List<EmpContactModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
