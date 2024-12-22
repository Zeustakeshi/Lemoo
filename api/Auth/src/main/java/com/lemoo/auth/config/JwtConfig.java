/*
 *  JwtConfig
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:42 AM
 * */

package com.lemoo.auth.config;

import com.lemoo.auth.common.properties.AccessTokenProperties;
import com.lemoo.auth.common.properties.RefreshTokenProperties;
import com.lemoo.auth.service.KeyService;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties({AccessTokenProperties.class, RefreshTokenProperties.class})
public class JwtConfig {
    private final KeyService keyService;

    @Primary
    @Bean(name = "accessTokenEncoder")
    public JwtEncoder accessTokenEncoder() {
        JWK jwk = new RSAKey.Builder(keyService.getAccessTokenPublicKey())
                .privateKey(keyService.getAccessTokenPrivateKey())
                .keyID("lemoo-client")
                .build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));

        return new NimbusJwtEncoder(jwkSource);
    }

    @Primary
    @Bean(name = "accessTokenDecoder")
    JwtDecoder accessTokenDecoder() {
        return NimbusJwtDecoder
                .withPublicKey(keyService.getAccessTokenPublicKey())
                .build();
    }

    @Bean(name = "refreshTokenEncoder")
    public JwtEncoder refreshTokenEncoder() {
        JWK jwk = new RSAKey.Builder(keyService.getRefreshTokenPublicKey())
                .privateKey(keyService.getRefreshTokenPrivateKey())
                .build();
        JWKSource<SecurityContext> jwkSource = new ImmutableJWKSet<>(new JWKSet(jwk));

        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean(name = "refreshTokenDecoder")
    JwtDecoder refreshTokenDecoder() {
        return NimbusJwtDecoder.withPublicKey(keyService.getRefreshTokenPublicKey())
                .build();
    }
}
