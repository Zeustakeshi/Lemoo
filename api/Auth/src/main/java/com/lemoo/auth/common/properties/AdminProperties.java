/*
 *  AdminProperties
 *  @author: Minhhieuano
 *  @created 1/30/2025 4:34 PM
 * */


package com.lemoo.auth.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "admin")
public record AdminProperties(String email, String password) {
}
