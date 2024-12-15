package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.DTO.EmpFollowingDTO;
import com.hris.HRIS_job_portal.Model.EmpFollowingModel;
import com.hris.HRIS_job_portal.Service.EmpFollowingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v2/emp_followings")
public class EmpFollowingController {

    @Autowired
    private EmpFollowingService empFollowingService;

    @GetMapping("/getByEmployeeId/{employeeId}")
    public List<EmpFollowingModel> getEmpFollowingByEmployeeId(@PathVariable String employeeId) {
        return empFollowingService.getEmpFollowingByEmployeeId(employeeId);
    }

    @PostMapping("/add")
    public EmpFollowingModel addEmpFollowing(@RequestBody EmpFollowingModel empFollowing) {
        return empFollowingService.addEmpFollowing(empFollowing);
    }

    @PutMapping("/update/{id}")
    public EmpFollowingModel updateEmpFollowings(@PathVariable String id, @RequestBody EmpFollowingModel empFollowing) {
        return empFollowingService.updateEmpFollowings(id, empFollowing);
    }

    @PutMapping("/edit-single/{employeeId}")
    public EmpFollowingModel updateEmpFollowing(@PathVariable String employeeId, @RequestBody EmpFollowingDTO empFollowing) {
        return empFollowingService.editFollowing(employeeId, empFollowing);
    }

    @DeleteMapping("/delete/{employeeId}")
    public void deleteFollowings(@PathVariable String employeeId) {
        empFollowingService.deleteFollowings(employeeId);
    }

    @DeleteMapping("/delete/{employeeId}/{followingId}")
    public EmpFollowingModel deleteFollowing(@PathVariable String employeeId, @PathVariable String followingId) {
        return empFollowingService.deleteFollowing(employeeId, followingId);
    }
}
