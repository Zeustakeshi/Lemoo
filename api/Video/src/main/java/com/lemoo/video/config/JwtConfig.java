/*
 *  JwtConfig
 *  @author: Minhhieuano
 *  @created 10/29/2024 1:58 PM
 * */

package com.lemoo.video.config;

import com.lemoo.video.common.properties.ServiceUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {
    private final ServiceUrl serviceUrl;

    @Bean
    JwtDecoder jwtDecoder() {
        String jwkSetUrl = serviceUrl.authService() + "/internal/token/.well-known/jwks.json";
        return NimbusJwtDecoder.withJwkSetUri(jwkSetUrl).build();
    }
}
