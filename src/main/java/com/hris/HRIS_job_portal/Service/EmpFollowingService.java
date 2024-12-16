package com.hris.HRIS_job_portal.Service;

import com.hris.HRIS_job_portal.DTO.EmpFollowingDTO;
import com.hris.HRIS_job_portal.Model.EmpFollowingModel;
import com.hris.HRIS_job_portal.Model.EmployeeModel;
import com.hris.HRIS_job_portal.Repository.EmpFollowingRepository;
import com.hris.HRIS_job_portal.Repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    public List<EmpFollowingModel> getEmpFollowingByEmployeeId(String employeeId) { return empFollowingRepository.findByEmployeeId(employeeId); }

    public EmpFollowingModel addEmpFollowing(EmpFollowingModel empFollowing) {
        List<EmpFollowingModel> followingList = getEmpFollowingByEmployeeId(empFollowing.getEmployeeId());
        EmpFollowingModel empFollowingModel;

        if (followingList.isEmpty()){
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
        }

        return empFollowingModel;
    }

    public EmpFollowingModel updateEmpFollowings(String id, EmpFollowingModel empFollowing) {
        EmpFollowingModel empFollowingModel = empFollowingRepository.findById(id).orElse(null);

        if (empFollowingModel != null) {
            empFollowingModel.setEmployeeId(empFollowing.getEmployeeId());
            empFollowingModel.setFollowings(empFollowing.getFollowings());
            return empFollowingRepository.save(empFollowingModel);
        }

        return null;
    }

    public void deleteFollowings(String employeeId) {
        empFollowingRepository.deleteByEmployeeId(employeeId);
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
            }
            return empFollowingModel;
        }
        throw new RuntimeException("Followings not found for employeeId: " + employeeId);
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
}
