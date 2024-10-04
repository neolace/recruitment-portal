package com.hris.HRIS_job_portal.Service.payment;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.Subscription;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {

    @Value("${stripe.apiKey}")
    private String stripeApiKey;

    @PostConstruct
    public void init() {
        Stripe.apiKey = stripeApiKey;
    }

    public Customer createCustomer(String email, String paymentMethodId) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("email", email);
        params.put("payment_method", paymentMethodId);
        params.put("invoice_settings", Map.of("default_payment_method", paymentMethodId));

        return Customer.create(params);
    }

    public Subscription createSubscription(String customerId, String priceId) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("customer", customerId);
        params.put("items", List.of(Map.of("price", priceId)));
        params.put("expand", List.of("latest_invoice.payment_intent"));

        return Subscription.create(params);
    }

    public Invoice getInvoice(String invoiceId) throws StripeException {
        return Invoice.retrieve(invoiceId);
    }
}

