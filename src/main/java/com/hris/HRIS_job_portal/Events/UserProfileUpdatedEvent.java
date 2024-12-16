package com.hris.HRIS_job_portal.Events;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfileUpdatedEvent {
    private String userId;
    private String fullName;
    private String occupation;
    private String profileImage;
}
