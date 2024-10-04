package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Service.payment.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Subscription;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    @Autowired
    private StripeService stripeService;

    @PostMapping("/create-customer")
    public Customer createCustomer(@RequestParam String email, @RequestParam String paymentMethodId) throws StripeException {
        return stripeService.createCustomer(email, paymentMethodId);
    }

    @PostMapping("/create-subscription")
    public Subscription createSubscription(@RequestParam String customerId, @RequestParam String priceId) throws StripeException {
        return stripeService.createSubscription(customerId, priceId);
    }
}

