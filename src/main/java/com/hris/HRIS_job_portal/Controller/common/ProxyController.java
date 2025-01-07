package com.hris.HRIS_job_portal.Controller.common;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
public class ProxyController {

    @GetMapping(value = "/**", produces = MediaType.TEXT_HTML_VALUE)
    public ResponseEntity<String> proxyToSSR(HttpServletRequest request) {
        String angularSSRUrl = "https://talentboozt.com/" + request.getRequestURI();
        RestTemplate restTemplate = new RestTemplate();
        String html = restTemplate.getForObject(angularSSRUrl, String.class);
        return ResponseEntity.ok(html);
    }
}
