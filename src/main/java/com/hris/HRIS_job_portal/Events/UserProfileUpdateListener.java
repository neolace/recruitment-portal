package com.hris.HRIS_job_portal.Events;

import com.hris.HRIS_job_portal.Service.EmpFollowersService;
import com.hris.HRIS_job_portal.Service.EmpFollowingService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileUpdateListener {

    @Autowired
    private EmpFollowersService empFollowersService;

    @Autowired
    private EmpFollowingService empFollowingService;

    @RabbitListener(queues = "profile.queue")
    public void handleUserProfileUpdated(UserProfileUpdatedEvent event) {
        // Update followers
        empFollowersService.updateFollowersForUser(event.getUserId(), event.getFullName(), event.getOccupation(), event.getProfileImage());

        // Update followings
        empFollowingService.updateFollowingsForUser(event.getUserId(), event.getFullName(), event.getOccupation(), event.getProfileImage());
    }
}
