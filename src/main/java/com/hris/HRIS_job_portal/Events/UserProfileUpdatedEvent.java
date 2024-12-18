package com.hris.HRIS_job_portal.Events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileUpdatedEvent implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String userId;
    private String fullName;
    private String occupation;
    private String profileImage;
}
