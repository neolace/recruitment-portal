package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.EmpFollowersDTO;
import com.hris.HRIS_job_portal.Model.EmpFollowersModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpFollowersRepository;
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
public class EmpFollowersService {
    @Autowired
    EmpFollowersRepository empFollowersRepository;

    @Autowired
    EmployeeRepository employeeRepository;

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public List<EmpFollowersModel> getEmpFollowersByEmployeeId(String employeeId) {
        return empFollowersRepository.findByEmployeeId(employeeId);
    }

    public EmpFollowersModel addEmpFollowers(EmpFollowersModel empFollowers) {
        List<EmpFollowersModel> empFollowersList = getEmpFollowersByEmployeeId(empFollowers.getEmployeeId());
        EmpFollowersModel empFollowersModel;

        if (!empFollowersList.isEmpty()) {
            empFollowersModel = empFollowersList.get(0);
            List<EmpFollowersDTO> followers = empFollowersModel.getFollowers();

            if (followers == null) {
                followers = new ArrayList<>();
            }
            followers.addAll(empFollowers.getFollowers());
            empFollowersModel.setFollowers(followers);
        } else {
            empFollowersModel = empFollowersRepository.save(empFollowers);
        }

        empFollowersRepository.save(empFollowersModel);

        Optional<EmployeeModel> employeeModel = employeeRepository.findById(empFollowers.getEmployeeId());
        if (employeeModel.isPresent()) {
            EmployeeModel existingEmployee = employeeModel.get();
            existingEmployee.setFollowers(empFollowersModel.getId());

            Map<String, Boolean> profileCompleted = (Map<String, Boolean>) existingEmployee.getProfileCompleted();
            if (profileCompleted == null) {
                profileCompleted = new HashMap<>();
            }
            profileCompleted.put("followers", true);
            existingEmployee.setProfileCompleted(profileCompleted);

            employeeRepository.save(existingEmployee);

            // Publish RabbitMQ event
            publishFollowerEvent("add", empFollowersModel);
        }

        return empFollowersModel;
    }

    public EmpFollowersModel updateEmpFollowers(String id, EmpFollowersModel empFollowers) {
        EmpFollowersModel empFollowersModel = empFollowersRepository.findById(id).orElse(null);

        if (empFollowersModel != null) {
            List<EmpFollowersDTO> followers = empFollowersModel.getFollowers();

            empFollowersModel.setEmployeeId(empFollowers.getEmployeeId());
            empFollowersModel.setFollowers(followers);

            EmpFollowersModel updatedModel = empFollowersRepository.save(empFollowersModel);

            // Publish RabbitMQ event
            publishFollowerEvent("update", updatedModel);

            return updatedModel;
        }
        return null;
    }

    public void deleteEmpFollowers(String employeeId) {
        List<EmpFollowersModel> followers = getEmpFollowersByEmployeeId(employeeId);
        if (!followers.isEmpty()) {
            empFollowersRepository.deleteByEmployeeId(employeeId);
            publishFollowerEvent("delete", followers.get(0));
        }
    }

    public EmpFollowersModel deleteEmpFollower(String employeeId, String followerId) {
        List<EmpFollowersModel> followers = getEmpFollowersByEmployeeId(employeeId);
        if (!followers.isEmpty()) {
            EmpFollowersModel empFollowersModel = followers.get(0);
            List<EmpFollowersDTO> followings = empFollowersModel.getFollowers();
            if (followings != null) {
                followings.removeIf(follower -> follower.getId().equals(followerId));
                empFollowersModel.setFollowers(followings);
                empFollowersRepository.save(empFollowersModel);

                // Publish RabbitMQ event
                publishFollowerEvent("remove", empFollowersModel);

                return empFollowersModel;
            }
        } else {
            throw new RuntimeException("Followers not found for employeeId: " + employeeId);
        }
        return null;
    }

    public EmpFollowersModel editFollower(String employeeId, EmpFollowersDTO followersDto) {
        List<EmpFollowersModel> followersList = getEmpFollowersByEmployeeId(employeeId);
        if (!followersList.isEmpty()) {
            EmpFollowersModel empFollowersModel = followersList.get(0);
            List<EmpFollowersDTO> followers = empFollowersModel.getFollowers();
            if (followers != null) {
                for (EmpFollowersDTO follower : followers) {
                    if (follower.getId().equals(followersDto.getId())) {
                        follower.setFollowerId(followersDto.getFollowerId());
                        follower.setFollowerName(followersDto.getFollowerName());
                        follower.setFollowerOccupation(followersDto.getFollowerOccupation());
                        follower.setFollowerImage(followersDto.getFollowerImage());
                        follower.setFollowerLocation(followersDto.getFollowerLocation());
                        break;
                    }
                }
                empFollowersModel.setFollowers(followers);
                empFollowersRepository.save(empFollowersModel);
            }
            return empFollowersModel;
        }
        throw new RuntimeException("Followers not found for employeeId: " + employeeId);
    }

    @Async
    public CompletableFuture<List<EmpFollowersModel>> getEmpFollowersByEmployeeIdAsync(String employeeId) {
        List<EmpFollowersModel> empFollowers = getEmpFollowersByEmployeeId(employeeId);
        return CompletableFuture.completedFuture(empFollowers);
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

    public void updateFollowersForUser(String userId, String fullName, String occupation, String profileImage) {
        List<EmpFollowersModel> followersList = empFollowersRepository.findByEmployeeId(userId);
        for (EmpFollowersModel followersModel : followersList) {
            List<EmpFollowersDTO> followers = followersModel.getFollowers();
            if (followers != null) {
                for (EmpFollowersDTO follower : followers) {
                    if (follower.getFollowerId().equals(userId)) {
                        follower.setFollowerName(fullName);
                        follower.setFollowerOccupation(occupation);
                        follower.setFollowerImage(profileImage);
                    }
                }
                empFollowersRepository.save(followersModel);
            }
        }
    }

    private void publishFollowerEvent(String action, EmpFollowersModel empFollowersModel) {
        try {
            Map<String, Object> event = new HashMap<>();
            event.put("action", action);
            event.put("employeeId", empFollowersModel.getEmployeeId());
            event.put("followers", empFollowersModel.getFollowers());

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
