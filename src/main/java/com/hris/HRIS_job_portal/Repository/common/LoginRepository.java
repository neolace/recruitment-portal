package com.hris.HRIS_job_portal.Repository.common;

import com.hris.HRIS_job_portal.Model.common.Login;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface LoginRepository extends MongoRepository<Login, String> {
    Optional<Login> findByUserId(String userId);
}
