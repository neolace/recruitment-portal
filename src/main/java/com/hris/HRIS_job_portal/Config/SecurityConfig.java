package com.hris.HRIS_job_portal.Config;

import com.hris.HRIS_job_portal.Model.CredentialsModel;
import com.hris.HRIS_job_portal.Service.CredentialsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private CredentialsService credentialsService;

    @Autowired
    private ConfigUtility configUtil;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**", "/login", "/oauth2/**", "/oauth/**").permitAll()
                        .anyRequest().authenticated()
                )
                .csrf(AbstractHttpConfigurer::disable)
                .httpBasic(withDefaults())
                .formLogin(form -> form
                        .loginPage(configUtil.getProperty("FAILURE_REDIRECT"))
                        .defaultSuccessUrl(configUtil.getProperty("SUCCESS_REDIRECT"), true)
                        .permitAll()
                )
                .oauth2Login(oauth2 -> oauth2
                        .loginPage(configUtil.getProperty("FAILURE_REDIRECT"))
                        .userInfoEndpoint(userInfo -> userInfo
                                .oidcUserService(this.oidcUserService())
                        )
                        .defaultSuccessUrl(configUtil.getProperty("GOOGLE_CLIENT_REDIRECT"), true)
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public UserDetailsService users() {
        PasswordEncoder encoder = passwordEncoder();
        UserDetails user = User.builder()
                .username(configUtil.getProperty("USER2_USERNAME"))
                .password(encoder.encode(configUtil.getProperty("USER2_PASSWORD")))
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username(configUtil.getProperty("USER1_USERNAME"))
                .password(encoder.encode(configUtil.getProperty("USER1_PASSWORD")))
                .roles("USER", "ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    private OidcUserService oidcUserService() {
        OidcUserService delegate = new OidcUserService();
        return new OidcUserService() {
            @Override
            public OidcUser loadUser(OidcUserRequest userRequest) {
                OidcUser oidcUser = delegate.loadUser(userRequest);
                String email = oidcUser.getEmail();
                String firstName = oidcUser.getGivenName();
                String lastName = oidcUser.getFamilyName();

                // Custom user registration logic
                CredentialsModel existingCredentials = credentialsService.getCredentialsByEmail(email);
                if (existingCredentials != null) {
                    return loginUser(existingCredentials);
                } else {
                    return registerGoogleUser(email, firstName, lastName);
                }
            }
        };
    }

    private OidcUser loginUser(CredentialsModel credentials) {
        credentials.setRole("candidate");
        credentials.setUserLevel("1");
        return (OidcUser) credentials;
    }

    private OidcUser registerGoogleUser(String email, String firstName, String lastName) {
        CredentialsModel newUser = new CredentialsModel();
        newUser.setEmail(email);
        newUser.setFirstname(firstName);
        newUser.setLastname(lastName);
        newUser.setRole("candidate");
        newUser.setUserLevel("1");
        CredentialsModel savedUser = credentialsService.addCredentials(newUser);
        return (OidcUser) savedUser;
    }
}
