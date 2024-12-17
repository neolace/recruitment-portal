package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.EmpFollowingDTO;
import com.hris.HRIS_job_portal.Model.EmpFollowingModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpFollowingRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.retry.annotation.*;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
public class EmpFollowingService {

    @Autowired
    EmpFollowingRepository empFollowingRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<EmpFollowingModel> getEmpFollowingByEmployeeId(String employeeId) { return empFollowingRepository.findByEmployeeId(employeeId); }

    public EmpFollowingModel addEmpFollowing(EmpFollowingModel empFollowing) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(empFollowing.getEmployeeId());
        EmpFollowingModel empFollowingModel;

        if (!followingList.isEmpty()){
            empFollowingModel = followingList.get(0);
            List<EmpFollowingDTO> followings = empFollowingModel.getFollowings();
            if (followings == null) {
                followings = new ArrayList<>();
            }
            followings.addAll(empFollowing.getFollowings());
            empFollowingModel.setFollowings(followings);
        } else {
            empFollowingModel = empFollowingRepository.save(empFollowing);
        }

        empFollowingRepository.save(empFollowingModel);

        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empFollowing.getEmployeeId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setFollowings(empFollowingModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>();
            }
            profileCompleted.put("followings", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);

            publishFollowingEvent("add", empFollowingModel);
        }

        return empFollowingModel;
    }

    public EmpFollowingModel updateEmpFollowings(String id, EmpFollowingModel empFollowing) {
        EmpFollowingModel empFollowingModel = empFollowingRepository.findById(id).orElse(null);

        if (empFollowingModel != null) {
            empFollowingModel.setEmployeeId(empFollowing.getEmployeeId());
            empFollowingModel.setFollowings(empFollowing.getFollowings());
            EmpFollowingModel updatedFollowing = empFollowingRepository.save(empFollowingModel);

            publishFollowingEvent("update", updatedFollowing);
            return updatedFollowing;
        }

        return null;
    }

    public void deleteFollowings(String employeeId) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(employeeId);
        if (!followingList.isEmpty()) {
            empFollowingRepository.deleteByEmployeeId(employeeId);
            publishFollowingEvent("delete", followingList.get(0));
        }
    }

    public EmpFollowingModel deleteFollowing(String employeeId, String followingId) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(employeeId);
        if (!followingList.isEmpty()) {
            EmpFollowingModel empFollowingModel = followingList.get(0);
            List<EmpFollowingDTO> followings = empFollowingModel.getFollowings();
            if (followings != null) {
                followings.removeIf(following -> following.getId().equals(followingId));
                empFollowingModel.setFollowings(followings);
                empFollowingRepository.save(empFollowingModel);

                publishFollowingEvent("remove", empFollowingModel);
                return empFollowingModel;
            }
        } else {
            throw new RuntimeException("Followings not found for employeeId: " + employeeId);
        }
        return null;
    }

    public EmpFollowingModel editFollowing(String employeeId, EmpFollowingDTO followingDto) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(employeeId);
        if (!followingList.isEmpty()) {
            EmpFollowingModel empFollowingModel = followingList.get(0);
            List<EmpFollowingDTO> followings = empFollowingModel.getFollowings();
            if (followings != null) {
                for (EmpFollowingDTO following : followings) {
                    if (following.getId().equals(followingDto.getId())) {
                        following.setFollowingId(followingDto.getFollowingId());
                        following.setFollowingName(followingDto.getFollowingName());
                        following.setFollowingOccupation(followingDto.getFollowingOccupation());
                        following.setFollowingImage(followingDto.getFollowingImage());
                        following.setFollowingLocation(followingDto.getFollowingLocation());
                        break;
                    }
                }
                empFollowingModel.setFollowings(followings);
                empFollowingRepository.save(empFollowingModel);
            }
            return empFollowingModel;
        }
        throw new RuntimeException("Followings not found for employeeId: " + employeeId);
    }

    @Async
    public CompletableFuture<List<EmpFollowingModel>> getEmpFollowingByEmployeeIdAsync(String employeeId) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(followingList);
    }

    // Events
    @Retryable(value = {Exception.class}, maxAttempts = 5, backoff = @Backoff(delay = 5000))
    public void publish(String exchange, String routingKey, String message) {
        if (rabbitTemplate != null) {
            rabbitTemplate.convertAndSend(exchange, routingKey, message);
        } else {
            System.err.println("RabbitMQ unavailable. Unable to send message: " + message);
        }
    }

    // Recovery method for retries
    @Recover
    public void recover(Exception e, String exchange, String routingKey, String message) {
        System.err.println("RabbitMQ is unavailable. Storing message for later: " + message);
        // Store the message in a database or another service for retry.
    }

    // Circuit breaker to handle failures gracefully
    @CircuitBreaker(name = "rabbitMQ", fallbackMethod = "fallbackPublish")
    public void processEvent(String exchange, String routingKey, String message) {
        publish(exchange, routingKey, message);
    }

    // Fallback method for circuit breaker
    public void fallbackPublish(String exchange, String routingKey, String message, Throwable throwable) {
        System.err.println("Circuit breaker activated. Storing event for later: " + message);
        // Store the message in a temporary storage.
    }

    // Method to trigger follower update events asynchronously
    public void triggerFollowerUpdateEvent(String userId, String fullName, String occupation, String profileImage) {
        String message = String.format("{\"userId\":\"%s\",\"fullName\":\"%s\",\"occupation\":\"%s\",\"profileImage\":\"%s\"}",
                userId, fullName, occupation, profileImage);
        processEvent("follower-exchange", "follower.key", message);
    }

    // Method to trigger following update events asynchronously
    public void triggerFollowingUpdateEvent(String userId, String fullName, String occupation, String profileImage) {
        String message = String.format("{\"userId\":\"%s\",\"fullName\":\"%s\",\"occupation\":\"%s\",\"profileImage\":\"%s\"}",
                userId, fullName, occupation, profileImage);
        processEvent("following-exchange", "following.key", message);
    }

    public void updateFollowingsForUser(String userId, String fullName, String occupation, String profileImage) {
        List<EmpFollowingModel> followingList = empFollowingRepository.findByEmployeeId(userId);
        for (EmpFollowingModel followingModel : followingList) {
            List<EmpFollowingDTO> followings = followingModel.getFollowings();
            if (followings != null) {
                for (EmpFollowingDTO following : followings) {
                    if (following.getFollowingId().equals(userId)) {
                        following.setFollowingName(fullName);
                        following.setFollowingOccupation(occupation);
                        following.setFollowingImage(profileImage);
                    }
                }
                empFollowingRepository.save(followingModel);
            }
        }
    }

    private void publishFollowingEvent(String action, EmpFollowingModel empFollowersModel) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("action", action);
            event.put("employeeId", empFollowersModel.getEmployeeId());
            event.put("followings", empFollowersModel.getFollowings());

            if (rabbitTemplate != null) {
                rabbitTemplate.convertAndSend("profile.exchange", "profile.updated", event);
                System.out.println("Event published to RabbitMQ: " + event);
            } else {
                System.err.println("RabbitMQ not configured. Unable to publish event: " + event);
            }
        } catch (Exception e) {
            System.err.println("Error publishing event to RabbitMQ: " + e.getMessage());
        }
    }
}
