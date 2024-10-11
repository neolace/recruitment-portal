package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.PasswordResetTokenModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends MongoRepository<PasswordResetTokenModel, String> {
    Optional<PasswordResetTokenModel> findByToken(String token);
}
