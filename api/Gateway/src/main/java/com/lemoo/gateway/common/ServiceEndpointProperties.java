/*
 *  ServiceEnpointProperties
 *  @author: Minhhieuano
 *  @created 9/14/2024 1:27 AM
 * */

package com.vibio.gateway.common;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "services")
public record ServiceEndpointProperties(String userService) {}
