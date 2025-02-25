/*
 *  JwtConfig
 *  @author: Minhhieuano
 *  @created 10/29/2024 1:58 PM
 * */


package com.lemoo.order_v2.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {

    @Value("${services.auth-service}")
    private String authServiceUrl;

    @Bean
    JwtDecoder jwtDecoder() {
        String jwkSetUrl = authServiceUrl + "/internal/token/.well-known/jwks.json";
        return NimbusJwtDecoder.withJwkSetUri(jwkSetUrl).build();
    }
}