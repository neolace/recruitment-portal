package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpFollowersModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmpFollowersRepository extends MongoRepository<EmpFollowersModel, String> {
    List<EmpFollowersModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
