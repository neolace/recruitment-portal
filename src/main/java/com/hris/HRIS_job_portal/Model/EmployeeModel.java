package com.hris.HRIS_job_portal.Model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection = "portal_employees")
public class EmployeeModel {
    @Id
    private String id;
    private String firstname;
    private String lastname;
    private String occupation;
    private String image;
    private String coverImage;
    private String dob;
    private String email;
    private String resume;
    private String intro;
    private String skills; //id
    private String experiences; //id
    private String education; //id
    private String contactInfo; //id
    private Object accountNotifications;
    private Object marketingNotifications;
    private Object profileCompleted;
    private String profileStatus;
}
