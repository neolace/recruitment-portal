package com.hris.HRIS_job_portal.Repository.mail;

import com.hris.HRIS_job_portal.Model.mail.NewsLatterModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface NewsLetterRepository extends MongoRepository<NewsLatterModel, String> {
    Optional<NewsLatterModel> findByEmail(String email);
}
