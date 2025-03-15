/*
 *  GoogleOAuthUrlProperties
 *  @author: Minhhieuano
 *  @created 3/15/2025 4:05 PM
 * */


package com.lemoo.auth.common.properties;


import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "spring.security.oauth2.url")
public record OAuthUrlProperties(
        String clientRedirectUrl,
        Google google
) {
    public record Google(
            String tokenUrl,
            String oauthUrl,
            String userUrl
    ) {
    }
}
