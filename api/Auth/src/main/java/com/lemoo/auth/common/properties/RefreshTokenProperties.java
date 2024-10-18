/*
 *  RefreshTokenProperties
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:51 AM
 * */


package com.lemoo.auth.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt.key.refresh-token")
public record RefreshTokenProperties(String publicKey, String privateKey, Long expireIn) {
}
