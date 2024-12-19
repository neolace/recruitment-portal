package com.hris.HRIS_job_portal.Events;

import com.hris.HRIS_job_portal.Service.common.ProfileUpdateService;
//import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileUpdateListener {

//    @Autowired
//    private ProfileUpdateService profileUpdateService;
//
//    @RabbitListener(queues = "profile.queue")
//    public void handleUserProfileUpdated(UserProfileUpdatedEvent event) {
//        profileUpdateService.bulkUpdateFollowingsAndFollowers(event.getUserId(), event.getFullName(), event.getOccupation(), event.getProfileImage());
//    }
}
