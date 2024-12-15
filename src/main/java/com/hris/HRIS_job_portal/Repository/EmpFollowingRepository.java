package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpFollowingModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmpFollowingRepository extends MongoRepository<EmpFollowingModel, String> {
    List<EmpFollowingModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
