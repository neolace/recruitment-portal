package com.hris.HRIS_job_portal.Repository.security;

import com.hris.HRIS_job_portal.Model.security.TokenModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface TokenRepository extends MongoRepository<TokenModel, String> {
    Optional<TokenModel> findByToken(String token);
}
