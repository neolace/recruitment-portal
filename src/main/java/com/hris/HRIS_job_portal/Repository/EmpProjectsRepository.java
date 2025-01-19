package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpProjectsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmpProjectsRepository extends MongoRepository<EmpProjectsModel, String> {
    List<EmpProjectsModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
