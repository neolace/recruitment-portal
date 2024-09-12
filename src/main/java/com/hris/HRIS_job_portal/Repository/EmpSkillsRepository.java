package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpSkillsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpSkillsRepository extends MongoRepository<EmpSkillsModel, String> {
    List<EmpSkillsModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
