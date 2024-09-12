package com.hris.HRIS_job_portal.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class EmpEducationDTO {
    @Id
    private String id;
    private String school;
    private String schoolLogo;
    private String degree;
    private String country;
    private String startDate;
    private String endDate;
    private String description;
}
