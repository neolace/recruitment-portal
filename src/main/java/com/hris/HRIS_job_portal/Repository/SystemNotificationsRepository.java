package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.SystemNotificationsModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface SystemNotificationsRepository extends MongoRepository<SystemNotificationsModel, String> {
    List<SystemNotificationsModel> findByActive(boolean active);
}
