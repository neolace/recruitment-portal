package com.hris.HRIS_job_portal.Controller.security;

import com.hris.HRIS_job_portal.DTO.ApiResponse;
import com.hris.HRIS_job_portal.Service.mail.EmailService;
import com.hris.HRIS_job_portal.Service.security.ValidateTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
public class TokenController {

    @Autowired
    private ValidateTokenService validateTokenService;

    @Autowired
    EmailService emailService;

    @GetMapping("/api/v2/validate-token")
    public ResponseEntity<ApiResponse> validateToken(@RequestParam String token) {
        System.out.println("Token: " + token);
        if (validateTokenService.validateToken(token)) {
            return ResponseEntity.ok(new ApiResponse("Valid token"));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid token"));
        }
    }

    @PostMapping("/api/v2/send-access-token/{email}")
    public ResponseEntity<ApiResponse> sendAccessToken(@PathVariable String email) throws UnsupportedEncodingException {
        emailService.sendInterviewPreparationQuestionAccess(email);
        return ResponseEntity.ok(new ApiResponse("Email sent successfully"));
    }
}
