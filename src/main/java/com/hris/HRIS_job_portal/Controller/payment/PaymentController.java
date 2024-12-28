package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Service.payment.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.PaymentIntent;
import com.stripe.model.Subscription;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @PostMapping("/create-payment-intent")
    public Map<String, String> createPaymentIntent(@RequestBody Map<String, Object> paymentData) throws StripeException {
        String companyId = (String) paymentData.get("companyId");
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(990L) // Amount in cents
                .setCurrency("usd")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build())
                .putMetadata("company_id", companyId)
                .build();

        PaymentIntent paymentIntent = PaymentIntent.create(params);
        Map<String, String> responseData = new HashMap<>();
        responseData.put("clientSecret", paymentIntent.getClientSecret());
        return responseData;
    }
}

