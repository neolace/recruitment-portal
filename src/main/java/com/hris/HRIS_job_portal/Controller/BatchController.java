package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Service.EmployeeService;
import com.hris.HRIS_job_portal.Service.JobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/batch")
public class BatchController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private JobService jobService;

    @GetMapping("/getAll")
    public Map<String, Object> getAllData(@RequestParam int page, @RequestParam int size) {
        Map<String, Object> response = new HashMap<>();
        response.put("employees", employeeService.getEmployeesPaginated(page, size));
//        response.put("jobs", jobService.getJobsPaginated(page, size));
        return response;
    }
}
