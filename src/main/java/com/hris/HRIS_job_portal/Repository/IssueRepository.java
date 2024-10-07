package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.IssueModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface IssueRepository extends MongoRepository<IssueModel, String> {
}
