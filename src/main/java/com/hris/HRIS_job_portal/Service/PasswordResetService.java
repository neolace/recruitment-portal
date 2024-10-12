package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.Model.CredentialsModel;
import com.hris.HRIS_job_portal.Model.PasswordResetTokenModel;
import com.hris.HRIS_job_portal.Repository.CredentialsRepository;
import com.hris.HRIS_job_portal.Repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private CredentialsRepository credentialsRepository; // Mongo repository for User

    @Autowired
    private PasswordResetTokenRepository tokenRepository; // Mongo repo for tokens

    public String createPasswordResetToken(String email) {
        Optional<CredentialsModel> userOptional = Optional.ofNullable(credentialsRepository.findByEmail(email));

        if (userOptional.isEmpty()) {
            throw new RuntimeException("User with this email does not exist.");
        }

        CredentialsModel user = userOptional.get();
        String token = UUID.randomUUID().toString();

        PasswordResetTokenModel resetToken = new PasswordResetTokenModel(token, user.getId(), LocalDateTime.now().plusMinutes(30)); // Token with 30 minutes expiry
        tokenRepository.save(resetToken); // Save the token

        return token; // Return token to send in the email
    }
}

