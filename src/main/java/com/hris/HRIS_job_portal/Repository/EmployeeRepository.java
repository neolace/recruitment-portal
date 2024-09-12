package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmployeeModel;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends MongoRepository<EmployeeModel, String> {
    List<EmployeeModel> findAllBy(Pageable pageable);
}
