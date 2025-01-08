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

//    @GetMapping("/{path:^(home|about|job|companies|privacy-policy|terms-and-conditions|pricing|faq|for-companies|employees)$}")
//    public String serveStatic(@PathVariable String path) {
//        if (!path.equals("")){
//            return "forward:/" + path + ".html";
//        }
//        return "forward:/index.html";
//    }

    @GetMapping("/home")
    public String serveHome() {
        return "forward:/home.html";
    }

    @GetMapping("/about")
    public String serveAbout() {
        return "forward:/about.html";
    }

    @GetMapping("/job")
    public String serveJob() {
        return "forward:/job.html";
    }

    @GetMapping("/companies")
    public String serveCompanies() {
        return "forward:/companies.html";
    }

    @GetMapping("/privacy-policy")
    public String servePrivacyPolicy() {
        return "forward:/privacy-policy.html";
    }

    @GetMapping("/terms-and-conditions")
    public String serveTermsAndConditions() {
        return "forward:/terms-and-conditions.html";
    }

    @GetMapping("/pricing")
    public String servePricing() {
        return "forward:/pricing.html";
    }

    @GetMapping("/faq")
    public String serveFaq() {
        return "forward:/faq.html";
    }

    @GetMapping("/for-companies")
    public String serveForCompanies() {
        return "forward:/for-companies.html";
    }

    @GetMapping("/employees")
    public String serveEmployees() {
        return "forward:/employees.html";
    }
}
