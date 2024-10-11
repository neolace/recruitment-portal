package com.hris.HRIS_job_portal.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class PasswordResetRequest {
    private String token;
    private String newPassword;
}
