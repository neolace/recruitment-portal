package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.InterviewQuestionModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface InterviewQuestionRepository extends MongoRepository<InterviewQuestionModel, String> {
}
