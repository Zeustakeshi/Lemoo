/*
 *  AccessTokenProperties
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:49 AM
 * */


package com.lemoo.auth.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "jwt.key.access-token")
public record AccessTokenProperties(String publicKey, String privateKey, Long expireIn) {
}
