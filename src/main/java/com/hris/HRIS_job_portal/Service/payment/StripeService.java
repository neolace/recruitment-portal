package com.hris.HRIS_job_portal.Service.payment;

import com.hris.HRIS_job_portal.Utils.ConfigUtility;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.Invoice;
import com.stripe.model.Subscription;
import com.stripe.model.checkout.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class StripeService {

    @Autowired
    ConfigUtility configUtility;

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

    public Session createCheckoutSession(String companyId, String planName) throws StripeException {
        Map<String, Object> params = new HashMap<>();
        params.put("line_items", List.of(Map.of("price", planName)));
        params.put("metadata", Map.of("company_id", companyId));
        params.put("mode", "subscription");
        params.put("success_url", configUtility.getProperty("STRIPE_SUCCESS_URL"));
        params.put("cancel_url", configUtility.getProperty("STRIPE_CANCEL_URL"));

        try {
            return Session.create(params);
        } catch (StripeException e) {
            throw new RuntimeException("Error creating Stripe Checkout Session: " + e.getMessage(), e);
        }
    }
}

