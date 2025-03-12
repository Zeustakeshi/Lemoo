/*
 *  SecurityConfig
 *  @author: Minhhieuano
 *  @created 12/13/2024 10:01 PM
 * */

package com.lemoo.notification.config;

import com.lemoo.notification.security.CustomServerAccessDeniedHandler;
import com.lemoo.notification.security.CustomServerAuthenticationEntryPoint;
import com.lemoo.notification.security.JwtAuthenticationConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.util.matcher.NegatedServerWebExchangeMatcher;
import org.springframework.security.web.server.util.matcher.ServerWebExchangeMatchers;

@Configuration
@EnableWebFluxSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationConverter jwtAuthenticationConverter;
    private final CustomServerAccessDeniedHandler serverAccessDeniedHandler;
    private final CustomServerAuthenticationEntryPoint authenticationEntryPoint;

    @Bean
    SecurityWebFilterChain filterChain(ServerHttpSecurity http) {
        http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .securityMatcher(new NegatedServerWebExchangeMatcher(
                        ServerWebExchangeMatchers.pathMatchers("/hello/v2")
                ))
                .exceptionHandling(handler -> handler.authenticationEntryPoint(authenticationEntryPoint)
                        .accessDeniedHandler(serverAccessDeniedHandler))
                .authorizeExchange(exchange -> exchange
                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt
                                .jwtAuthenticationConverter(jwtAuthenticationConverter)

                        ).authenticationEntryPoint(authenticationEntryPoint) // Xử lý lỗi 401
                );

        return http.build();
    }
}
