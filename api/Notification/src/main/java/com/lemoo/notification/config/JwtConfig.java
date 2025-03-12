/*
 *  JwtConfig
 *  @author: Minhhieuano
 *  @created 10/29/2024 1:58 PM
 * */

package com.lemoo.notification.config;

import com.lemoo.notification.common.properties.ServiceUrl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;

@Configuration
@RequiredArgsConstructor
public class JwtConfig {
    private final ServiceUrl serviceUrl;

    @Bean
    public ReactiveJwtDecoder jwtDecoder() {
        String jwkSetUrl = serviceUrl.authService() + "/internal/token/.well-known/jwks.json";
        return NimbusReactiveJwtDecoder.withJwkSetUri(jwkSetUrl).build();
    }
}
