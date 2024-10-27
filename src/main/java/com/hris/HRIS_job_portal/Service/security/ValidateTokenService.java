package com.hris.HRIS_job_portal.Service.security;

import com.hris.HRIS_job_portal.Config.ConfigUtility;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class ValidateTokenService {

    @Autowired
    private ConfigUtility configUtil;

    public String generateToken(String username) {
        SecretKey secretKey = Keys.hmacShaKeyFor(configUtil.getProperty("TOKEN_SECRET").getBytes());
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000))
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            JwtParser parser = Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(configUtil.getProperty("TOKEN_SECRET").getBytes())).build();
            parser.parseClaimsJws(token);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }
}

