package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmployeeModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {
}
