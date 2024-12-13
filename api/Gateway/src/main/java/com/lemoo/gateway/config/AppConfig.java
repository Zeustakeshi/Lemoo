/*
 *  AppConfig
 *  @author: Minhhieuano
 *  @created 10/27/2024 10:33 AM
 * */

package com.lemoo.gateway.config;

import com.lemoo.gateway.common.ServiceEndpointProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({ServiceEndpointProperties.class})
public class AppConfig {
}
