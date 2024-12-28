/*
 *  ServiceUrl
 *  @author: Minhhieuano
 *  @created 10/29/2024 1:55 PM
 * */

package com.lemoo.promotion.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "services")
public record ServiceUrl(String authService) {}
