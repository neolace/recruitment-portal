package com.hris.HRIS_job_portal.Controller.payment;

import com.hris.HRIS_job_portal.Model.payment.PaymentMethodsModel;
import com.hris.HRIS_job_portal.Service.payment.PaymentMethodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payment-methods")
public class PaymentMethodController {

    @Autowired
    private PaymentMethodService paymentMethodService;

    @GetMapping("/{companyId}")
    public ResponseEntity<List<PaymentMethodsModel>> getPaymentMethods(@PathVariable String companyId) {
        List<PaymentMethodsModel> paymentMethods = paymentMethodService.getPaymentMethods(companyId);
        return ResponseEntity.ok(paymentMethods);
    }

    @PostMapping("/{companyId}")
    public ResponseEntity<PaymentMethodsModel> addPaymentMethod(
            @PathVariable String companyId,
            @RequestBody PaymentMethodsModel paymentMethod) {
        PaymentMethodsModel addedPaymentMethod = paymentMethodService.addPaymentMethod(companyId, paymentMethod);
        return ResponseEntity.ok(addedPaymentMethod);
    }
}

