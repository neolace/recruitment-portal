package com.hris.HRIS_job_portal.DTO;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
public class SocialLinksDTO {
    @Id
    private String id;
    private String facebook;
    private String twitter;
    private String linkedin;
    private String instagram;
    private String github;
}
