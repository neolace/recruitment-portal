package com.hris.HRIS_job_portal.Controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Controller
public class AngularController {
    @GetMapping("/{path:[^\\.]*}")
    public String redirect(@PathVariable String path) {
        return "forward:/index.html";
    }
}
