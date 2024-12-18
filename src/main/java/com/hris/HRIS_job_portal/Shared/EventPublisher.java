package com.hris.HRIS_job_portal.Shared;

import com.hris.HRIS_job_portal.Events.UserProfileUpdatedEvent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class EventPublisher {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    private static final String EXCHANGE_NAME = "profile.exchange";

    public void publish(UserProfileUpdatedEvent event) {
        try {
            rabbitTemplate.convertAndSend(EXCHANGE_NAME, "profile.updated", event);
        } catch (Exception e) {
            System.err.println("Failed to publish event: " + e.getMessage());
            // Optionally, save the event to the database for retry.
        }
    }
}

