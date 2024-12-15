package com.hris.HRIS_job_portal.Controller.common;

import com.hris.HRIS_job_portal.Utils.EncryptionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/v2/encryption")
public class KeyController {

    private final EncryptionUtility encryptionUtility;

    public KeyController(EncryptionUtility encryptionUtility) {
        this.encryptionUtility = encryptionUtility;
    }

    @PostMapping("/encrypt")
    public ResponseEntity<Map> encrypt(@RequestBody Map<String, String> request) {
        String data = request.get("data");
        try {
            String encryptedData = encryptionUtility.encrypt(data);
            Map<String, String> response = Map.of("data", encryptedData);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = Map.of("Encryption failed", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/decrypt")
    public ResponseEntity<Map> decrypt(@RequestBody Map<String, String> request) {
        String data = request.get("data");
        try {
            String decryptedData = encryptionUtility.decrypt(data);
            Map<String, String> response = Map.of("data", decryptedData);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> response = Map.of("Decryption failed", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
