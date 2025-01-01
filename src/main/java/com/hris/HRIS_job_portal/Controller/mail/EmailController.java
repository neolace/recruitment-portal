package com.hris.HRIS_job_portal.Controller.mail;

import com.hris.HRIS_job_portal.DTO.ApiResponse;
import com.hris.HRIS_job_portal.DTO.mail.BankPaymentDTO;
import com.hris.HRIS_job_portal.DTO.mail.ContactUsDTO;
import com.hris.HRIS_job_portal.DTO.mail.PersonalContactDTO;
import com.hris.HRIS_job_portal.Service.mail.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v2/email")
public class EmailController {
    @Autowired
    private EmailService emailService;

    @PostMapping("/contact/{email}")
    public ResponseEntity<ApiResponse> contact(@PathVariable String email) {
        emailService.contactMe(email);
        return ResponseEntity.ok(new ApiResponse("Email sent successfully"));
    }

    @PostMapping("/contact-us")
    public ResponseEntity<ApiResponse> contactUs(@RequestBody ContactUsDTO contactUsDTO) {
        emailService.contactUs(contactUsDTO);
        return ResponseEntity.ok(new ApiResponse("Email sent successfully"));
    }

    @PostMapping("/personal-contact")
    public ResponseEntity<ApiResponse> personalContact(@RequestBody PersonalContactDTO personalContactDTO) {
        emailService.personalContact(personalContactDTO);
        return ResponseEntity.ok(new ApiResponse("Email sent successfully"));
    }

    @PostMapping("/bank-payment")
    public ResponseEntity<ApiResponse> bankPayment(@RequestBody BankPaymentDTO bankPaymentDTO) {
        emailService.bankPayment(bankPaymentDTO);
        return ResponseEntity.ok(new ApiResponse("Email sent successfully"));
    }
}
