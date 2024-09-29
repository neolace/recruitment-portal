package com.hris.HRIS_job_portal.Controller;

import com.hris.HRIS_job_portal.Config.ConfigUtility;
import com.hris.HRIS_job_portal.Model.CredentialsModel;
import com.hris.HRIS_job_portal.Service.CredentialsService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/oauth")
public class OAuthController {
    @Autowired
    private CredentialsService credentialsService;
    @Autowired
    private ConfigUtility configUtil;

    @GetMapping("/callback/google")
    public ResponseEntity<CredentialsModel> handleGoogleCallback(OAuth2AuthenticationToken authentication, @RequestParam("code") String code, HttpServletResponse response) throws IOException {
        String accessToken = exchangeCodeForAccessToken(code);
        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();

        String email = oidcUser.getEmail();
        String firstName = oidcUser.getGivenName();
        String lastName = oidcUser.getFamilyName();

        if (accessToken != null) {
            CredentialsModel existingCredentials = credentialsService.getCredentialsByEmail(email);
            response.addCookie(new Cookie("access_token", accessToken));
            response.sendRedirect(configUtil.getProperty("SUCCESS_REDIRECT"));
            if (existingCredentials != null) {
                return loginUser(existingCredentials);
            } else {
                return registerGoogleUser(email, firstName, lastName);
            }
        } else {
            response.sendRedirect(configUtil.getProperty("FAILURE_REDIRECT"));
            return null;
        }
    }

    private ResponseEntity<CredentialsModel> loginUser(CredentialsModel credentials) {
        credentials.setRole("candidate");
        credentials.setUserLevel("1");

        return ResponseEntity.ok(credentials);
    }

    private ResponseEntity<CredentialsModel> registerGoogleUser(String email, String firstName, String lastName) {
        CredentialsModel newUser = new CredentialsModel();
        newUser.setEmail(email);
        newUser.setFirstname(firstName);
        newUser.setLastname(lastName);
        newUser.setRole("candidate");
        newUser.setUserLevel("1");

        CredentialsModel savedUser = credentialsService.addCredentials(newUser);
        return ResponseEntity.ok(savedUser);
    }

    private String exchangeCodeForAccessToken(String code) {
        RestTemplate restTemplate = new RestTemplate();
        String url = "https://oauth2.googleapis.com/token";

        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("code", code);
        parameters.add("client_id", configUtil.getProperty("GOOGLE_CLIENT_ID"));
        parameters.add("client_secret", configUtil.getProperty("GOOGLE_CLIENT_SECRET"));
        parameters.add("redirect_uri", configUtil.getProperty("GOOGLE_CLIENT_REDIRECT"));
        parameters.add("grant_type", configUtil.getProperty("GOOGLE_CLIENT_GRANT_TYPE"));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(parameters, headers);

        try {
            ResponseEntity<Map<String, Object>> response = restTemplate.postForEntity(url, request, (Class<Map<String, Object>>) (Class<?>) Map.class);
            Map<String, Object> body = response.getBody();

            if (body != null && body.containsKey("access_token")) {
                return body.get("access_token").toString();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
