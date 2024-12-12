package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.PreOrderModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PreOrderRepository extends MongoRepository<PreOrderModel, String> {
}
