/*
 *  OAuthProperties
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:29 PM
 * */


package com.lemoo.auth.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.security.oauth2.client.registration.google")
public record GoogleOAuthProperties(String clientId, String clientSecret) {
}
