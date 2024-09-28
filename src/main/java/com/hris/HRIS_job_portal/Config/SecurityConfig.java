package com.hris.HRIS_job_portal.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Description;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**", "/login", "/oauth2/**").permitAll()  // Public and OAuth2 URLs
                        .anyRequest().authenticated()                                        // All other requests need authentication
                )
                .csrf(AbstractHttpConfigurer::disable)                       // Disable CSRF (or enable in production)
                .httpBasic(withDefaults())                                       // Basic Authentication for APIs (updated method)
                .formLogin(form -> form                         // Updated formLogin with method chaining
                        .loginPage("/login")                   // Custom login page
                        .defaultSuccessUrl("/dashboard")        // Redirect after successful login
                        .permitAll()                           // Allow everyone to access login page
                )
                .oauth2Login(oauth2 -> oauth2                   // OAuth2 login configuration
                        .loginPage("/login")                   // Custom login page
                        .defaultSuccessUrl("/dashboard")        // Redirect after successful OAuth2 login
                );

        return http.build();
    }

    @Bean
    @Description("In-memory user details for testing")
    public UserDetailsService users() {
        PasswordEncoder encoder = passwordEncoder();
        UserDetails user = User.builder()
                .username("user")
                .password(encoder.encode("password"))
                .roles("USER")
                .build();
        UserDetails admin = User.builder()
                .username("admin")
                .password(encoder.encode("password"))
                .roles("USER", "ADMIN")
                .build();
        return new InMemoryUserDetailsManager(user, admin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
