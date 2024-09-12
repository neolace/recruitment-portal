package com.hris.HRIS_job_portal.Model;

import com.hris.HRIS_job_portal.DTO.EmpContactDTO;
import com.hris.HRIS_job_portal.DTO.SocialLinksDTO;
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

@Document(collection = "portal_emp_contact")
public class EmpContactModel {
    @Id
    private String id;
    private String employeeId;
    @Field("contact")
    private List<EmpContactDTO> contact;
    @Field("social_links")
    private List<SocialLinksDTO> socialLinks;
}
