package com.hris.HRIS_job_portal.Controller.payment;

import com.stripe.model.Event;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/webhook")
public class StripeWebhookController {

    @PostMapping("/stripe-events")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload) {
        // Handle Stripe event (e.g., payment succeeded, subscription updated)
        Event event = Event.GSON.fromJson(payload, Event.class);
        // Process the event
        return ResponseEntity.ok("Event processed");
    }
}

