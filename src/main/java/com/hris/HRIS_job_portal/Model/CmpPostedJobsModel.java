package com.hris.HRIS_job_portal.Model;

import com.hris.HRIS_job_portal.DTO.PostedJobsDTO;
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

@Document(collection = "portal_cmp_posted_jobs")
public class CmpPostedJobsModel {
    @Id
    private String id;
    private String companyId;
    private String companyName;
    private String companyLogo;
    private String companyLevel;
    private String category;
    @Field("postedJobs")
    private List<PostedJobsDTO> postedJobs;
}
