package com.hris.HRIS_job_portal.Model;

import com.hris.HRIS_job_portal.DTO.JobApplicantDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@Getter
@Setter
@ToString

@Document(collection = "portal_job_applicants")
public class JobApplyModel {
    @Id
    private String id;
    private String companyId;
    private String jobId;
    private String jobClosingDate;
    @Field("applicants")
    List<JobApplicantDTO> applicants;
}
