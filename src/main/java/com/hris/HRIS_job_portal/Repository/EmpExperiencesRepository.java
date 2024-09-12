package com.hris.HRIS_job_portal.Repository;

import com.hris.HRIS_job_portal.Model.EmpExperiencesModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmpExperiencesRepository extends MongoRepository<EmpExperiencesModel, String> {
    List<EmpExperiencesModel> findByEmployeeId(String employeeId);

    void deleteByEmployeeId(String employeeId);
}
