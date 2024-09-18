package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.CredentialsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface CredentialsRepository extends MongoRepository<CredentialsModel, String> {

    CredentialsModel findByEmail(String email);

    Optional<CredentialsModel> findByEmployeeId(String password);

    CredentialsModel deleteByEmployeeId(String employeeIdd);
}
