/*
 *  ApplicationConfig
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:51 AM
 * */

package com.lemoo.chat.config;

import com.lemoo.chat.common.properties.ServiceUrl;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({ServiceUrl.class})
public class ApplicationConfig {}
