package com.hris.HRIS_job_portal.Service._private;

import com.hris.HRIS_job_portal.Model._private.UserActivity;
import com.hris.HRIS_job_portal.Repository._private.UserActivityRepository;
import com.hris.HRIS_job_portal.Utils.EncryptionUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class UserActivityService {

    @Autowired
    private UserActivityRepository repository;

    public void logUserActivity(String userId, String ipAddress, String endpointAccessed) {
        try {
            String encryptedIp = EncryptionUtility.encrypt(ipAddress);

            UserActivity activity = new UserActivity();
            activity.setUserId(userId);
            activity.setEncryptedIpAddress(encryptedIp);
            activity.setTimestamp(LocalDateTime.now());
            activity.setEndpointAccessed(endpointAccessed);

            repository.save(activity);
        } catch (Exception e) {
            e.printStackTrace(); // Handle encryption exceptions
        }
    }

    public String decryptIpAddress(String encryptedIp) {
        try {
            return EncryptionUtility.decrypt(encryptedIp);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public List<Map<String, String>> getAllUserActivities() {
        return repository.findAll().stream().map(activity -> {
            Map<String, String> data = new HashMap<>();
            data.put("userId", activity.getUserId());
            data.put("ipAddress", decryptIpAddress(activity.getEncryptedIpAddress()));
            data.put("timestamp", activity.getTimestamp().toString());
            data.put("endpointAccessed", activity.getEndpointAccessed());
            return data;
        }).collect(Collectors.toList());
    }
}

