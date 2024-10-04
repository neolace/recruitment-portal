package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.BillingHistoryModel;
import com.hris.HRIS_job_portal.Model.payment.InvoicesModel;
import com.hris.HRIS_job_portal.Model.payment.PaymentMethodsModel;
import com.hris.HRIS_job_portal.Repository.payment.BillingHistoryRepository;
import com.hris.HRIS_job_portal.Repository.payment.InvoiceRepository;
import com.hris.HRIS_job_portal.Repository.payment.PaymentMethodRepository;
import com.hris.HRIS_job_portal.Service.payment.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.Event;
import com.stripe.model.PaymentIntent;
import com.stripe.model.PaymentMethod;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/webhook")
public class StripeWebhookController {

    @Autowired
    PaymentMethodRepository paymentMethodRepository;

    @Autowired
    BillingHistoryRepository billingHistoryRepository;

    @Autowired
    InvoiceRepository invoiceRepository;

    @Autowired
    StripeService stripeService;

    @PostMapping("/stripe-events")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload) {
        // Handle Stripe event (e.g., payment succeeded, subscription updated)
        Event event = Event.GSON.fromJson(payload, Event.class);
        // Process the event
        return ResponseEntity.ok("Event processed");
    }

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckoutSession(@RequestBody Map<String, Object> data) throws StripeException {
        String companyId = (String) data.get("companyId");
        String planName = (String) data.get("planName");

        // Create a Stripe Checkout Session (existing logic)
        Session session = stripeService.createCheckoutSession(companyId, planName);

        Map<String, String> response = new HashMap<>();
        response.put("id", session.getId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader) {
        String endpointSecret = "whsec_yourWebhookSecret";

        try {
            Event event = Webhook.constructEvent(payload, sigHeader, endpointSecret);

            if ("checkout.session.completed".equals(event.getType())) {
                Session session = (Session) event.getDataObjectDeserializer().getObject().get();

                // Retrieve the payment intent ID from the session
                String paymentIntentId = session.getPaymentIntent();

                // Fetch the Payment Intent object from Stripe
                PaymentIntent paymentIntent = PaymentIntent.retrieve(paymentIntentId);

                // Retrieve the payment method used in the transaction
                PaymentMethod paymentMethod = PaymentMethod.retrieve(paymentIntent.getPaymentMethod());

                // Store Payment Method
                PaymentMethodsModel paymentMethodModel = new PaymentMethodsModel();
                paymentMethodModel.setCompanyId(session.getClientReferenceId());
                paymentMethodModel.setType(paymentMethod.getType()); // stripe, card, etc.
                paymentMethodModel.setLast_four(paymentMethod.getCard().getLast4()); // Get last 4 digits
                paymentMethodModel.setExpiry_date(paymentMethod.getCard().getExpMonth() + "/" + paymentMethod.getCard().getExpYear());
                paymentMethodRepository.save(paymentMethodModel);

                // Store Billing History
                BillingHistoryModel billingHistory = new BillingHistoryModel();
                billingHistory.setCompanyId(session.getClientReferenceId());
                billingHistory.setAmount(String.valueOf(paymentIntent.getAmountReceived()));
                billingHistory.setDate(new Date().toString());
                billingHistory.setInvoice_id(session.getId());
                billingHistory.setStatus("Completed");
                billingHistoryRepository.save(billingHistory);

                // Store Invoice (optional)
                InvoicesModel invoice = new InvoicesModel();
                invoice.setCompanyId(session.getClientReferenceId());
                invoice.setInvoice_number(session.getId());
                invoice.setAmount(String.valueOf(paymentIntent.getAmountReceived()));
                invoice.setDate_issued(new Date().toString());
                invoice.setDue_date("N/A"); // If applicable, add due date
                invoice.setStatus("Paid");
                invoiceRepository.save(invoice);
            }
            return ResponseEntity.ok("Webhook received");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Webhook error: " + e.getMessage());
        }
    }

}

