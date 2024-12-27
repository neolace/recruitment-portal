package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingHistoryModel;
import com.hris.HRIS_job_portal.Model.payment.InvoicesModel;
import com.hris.HRIS_job_portal.Model.payment.PaymentMethodsModel;
import com.hris.HRIS_job_portal.Repository.payment.BillingHistoryRepository;
import com.hris.HRIS_job_portal.Repository.payment.InvoiceRepository;
import com.hris.HRIS_job_portal.Repository.payment.PaymentMethodRepository;
import com.hris.HRIS_job_portal.Service.payment.BillingHistoryService;
import com.hris.HRIS_job_portal.Service.payment.PaymentMethodService;
import com.hris.HRIS_job_portal.Service.payment.StripeService;
import com.hris.HRIS_job_portal.Service.payment.SubscriptionService;
import com.stripe.exception.StripeException;
import com.stripe.model.*;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v2/webhook")
public class StripeWebhookController {

    private static final String STRIPE_SECRET = "whsec_yourWebhookSecret";

    @Autowired
    PaymentMethodRepository paymentMethodRepository;

    @Autowired
    BillingHistoryRepository billingHistoryRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    StripeService stripeService;

    @Autowired
    private SubscriptionService subscriptionService;

    @Autowired
    private BillingHistoryService billingHistoryService;

    @Autowired
    private PaymentMethodService paymentMethodService;

    @PostMapping("/stripe-events")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload) {
        Event event = Event.GSON.fromJson(payload, Event.class);
        return ResponseEntity.ok("Event processed");
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) throws StripeException {
        String companyId = (String) data.get("companyId");
        String planName = (String) data.get("planName");

        Session session = stripeService.createCheckoutSession(companyId, planName);

        Map<String, String> response = new HashMap<>();
        response.put("id", session.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(
            @RequestBody String payload,
            @RequestHeader("Stripe-Signature") String sigHeader) {

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, STRIPE_SECRET);

            switch (event.getType()) {
                case "checkout.session.completed":
                    handleCheckoutSessionCompleted(event);
                    break;

                case "invoice.payment_succeeded":
                    handleInvoicePaymentSucceeded(event);
                    break;

                case "invoice.payment_failed":
                    handleInvoicePaymentFailed(event);
                    break;

                case "customer.subscription.updated":
                    handleSubscriptionUpdated(event);
                    break;

                case "customer.subscription.deleted":
                    handleSubscriptionDeleted(event);
                    break;

                default:
                    System.out.println("Unhandled event type: " + event.getType());
            }

            return ResponseEntity.ok("Webhook processed");

        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Webhook error: " + e.getMessage());
        }
    }

    private void handleCheckoutSessionCompleted(Event event) throws StripeException {
        Session session = (Session) event.getDataObjectDeserializer().getObject().get();
        String companyId = session.getMetadata().get("company_id");

        PaymentIntent paymentIntent = PaymentIntent.retrieve(session.getPaymentIntent());
        PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentIntent.getPaymentMethod());

        // Save payment method
        PaymentMethodsModel paymentMethodModel = new PaymentMethodsModel();
        paymentMethodModel.setCompanyId(companyId);
        paymentMethodModel.setType(paymentMethod.getType());
        paymentMethodModel.setLast_four(paymentMethod.getCard().getLast4());
        paymentMethodModel.setExpiry_date(paymentMethod.getCard().getExpMonth() + "/" + paymentMethod.getCard().getExpYear());
        paymentMethodService.save(paymentMethodModel);

        // Save billing history
        BillingHistoryModel billingHistory = new BillingHistoryModel();
        billingHistory.setCompanyId(companyId);
        billingHistory.setAmount(String.valueOf(paymentIntent.getAmountReceived()));
        billingHistory.setDate(new Date().toString());
        billingHistory.setInvoice_id(session.getId());
        billingHistory.setStatus("Completed");
        billingHistoryService.save(billingHistory);
    }

    private void handleInvoicePaymentSucceeded(Event event) {
        Invoice invoice = (Invoice) event.getDataObjectDeserializer().getObject().get();
        String subscriptionId = invoice.getSubscription();
        String amountPaid = String.valueOf(invoice.getAmountPaid());

        // Update subscription billing history
        subscriptionService.updateBillingHistory(subscriptionId, amountPaid, "Paid");
    }

    private void handleInvoicePaymentFailed(Event event) {
        Invoice invoice = (Invoice) event.getDataObjectDeserializer().getObject().get();
        String subscriptionId = invoice.getSubscription();

        // Update subscription as inactive
        subscriptionService.markAsInactive(subscriptionId);
    }

    private void handleSubscriptionUpdated(Event event) {
        Subscription subscription = (Subscription) event.getDataObjectDeserializer().getObject().get();
        subscriptionService.updateSubscriptionDetails(subscription);
    }

    private void handleSubscriptionDeleted(Event event) {
        Subscription subscription = (Subscription) event.getDataObjectDeserializer().getObject().get();
        subscriptionService.markAsInactive(subscription.getId());
    }
}

