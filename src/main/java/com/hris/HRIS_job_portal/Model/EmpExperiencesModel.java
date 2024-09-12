package com.hris.HRIS_job_portal.Model;

import com.hris.HRIS_job_portal.DTO.EmpExperiencesDTO;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.List;

@ToString
@Getter
@Setter

@Document(collection = "portal_emp_experiences")
public class EmpExperiencesModel {
    @Id
    private String id;
    private String employeeId;
    @Field("experiences")
    private List<EmpExperiencesDTO> experiences;
}
