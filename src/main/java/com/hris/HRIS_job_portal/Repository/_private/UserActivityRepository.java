package com.hris.HRIS_job_portal.Repository._private;

import com.hris.HRIS_job_portal.Model._private.UserActivity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserActivityRepository extends MongoRepository<UserActivity, String> {}

