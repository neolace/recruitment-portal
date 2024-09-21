package com.hris.HRIS_job_portal.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class PostedJobsDTO {
    @Id
    private String id;
    private String title;
    private String description;
    private String responsibilities;
    private String requirements;
    private String experience;
    private String education;
    private String skills;
    private String totalOpenings;
    private String jobBanner;
    private String employeeType;
    private String location;
    private String category;
    private String jobType;
    private String exShortDesc;
    private String eduShortDesc;
    private String minSalary;
    private String maxSalary;
    private String offers;
    private String datePosted;
    private String expiryDate;
    private String url;
}
