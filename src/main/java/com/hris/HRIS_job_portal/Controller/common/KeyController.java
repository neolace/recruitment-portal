package com.hris.HRIS_job_portal.Controller.common;

import com.hris.HRIS_job_portal.Utils.EncryptionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/v2/key")
public class KeyController {

    @Autowired
    private EncryptionUtility encryptionUtility;

    // Request DTO for password-related operations
    public static class PasswordRequest {
        private String password;
        private String encryptedPassword;

        // Getters and setters
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getEncryptedPassword() { return encryptedPassword; }
        public void setEncryptedPassword(String encryptedPassword) { this.encryptedPassword = encryptedPassword; }
    }

    @PostMapping("/encrypt")
    public ResponseEntity<String> encryptPassword(@RequestBody PasswordRequest request) {
        try {
            String encryptedPassword = EncryptionUtility.encrypt(request.getPassword());
            return ResponseEntity.ok(encryptedPassword);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Encryption failed: " + e.getMessage());
        }
    }

    @PostMapping("/decrypt")
    public ResponseEntity<String> decryptPassword(@RequestBody PasswordRequest request) {
        System.out.println(request.getEncryptedPassword());
        try {
            String decryptedPassword = EncryptionUtility.decrypt(request.getEncryptedPassword());
            return ResponseEntity.ok(decryptedPassword);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Decryption failed: " + e.getMessage());
        }
    }

    @PostMapping("/check-leak")
    public ResponseEntity<Boolean> checkPasswordLeak(@RequestBody PasswordRequest request) {
        try {
            return ResponseEntity.ok(checkPasswordLeaked(request.getPassword()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(false);
        }
    }

    private boolean checkPasswordLeaked(String password) throws Exception {
        // SHA-1 hash of the password
        byte[] sha1HashBytes = java.security.MessageDigest
                .getInstance("SHA-1")
                .digest(password.getBytes());

        String sha1Hash = IntStream.range(0, sha1HashBytes.length)
                .mapToObj(i -> String.format("%02x", sha1HashBytes[i]))
                .collect(Collectors.joining());

        String hashPrefix = sha1Hash.substring(0, 5);
        String hashSuffix = sha1Hash.substring(5);

        URL url = new URL("https://api.pwnedpasswords.com/range/" + hashPrefix);
        HttpURLConnection con = (HttpURLConnection) url.openConnection();
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            if (inputLine.startsWith(hashSuffix)) {
                in.close();
                return true;
            }
        }
        in.close();
        return false;
    }
}
