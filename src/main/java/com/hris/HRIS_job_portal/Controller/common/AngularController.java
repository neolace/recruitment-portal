package com.hris.HRIS_job_portal.Controller.common;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularController {

    @RequestMapping(value = "/{path:[^\\.]*}")
    public String redirect(@PathVariable String path) {
        return "forward:/index.html";
    }
}
