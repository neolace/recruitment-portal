package com.hris.HRIS_job_portal.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection = "portal_companies")
public class CompanyModel {
    @Id
    private String id;
    private String name;
    private String shortDescription;
    private String companyStory;
    private String companyLevel;
    private String logo;
    private String location;
    private String profileBanner;
    private String image1;
    private String image2;
    private String image3;
    private String foundedDate;
    private String founderName;
    private String headquarters;
    private String numberOfEmployees;
    private String website;
    private String linkedin;
    private String twitter;
    private String facebook;
    private String instagram;
    private String youtube;
    private String contactEmail;
    private String contactNumber;
    private String postedJobs; //id
    private String joinedDate;
    private String isVerified;
    private String followers;
    private String following;
}
