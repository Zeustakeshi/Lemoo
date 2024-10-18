/*
 *  ApplicationConfig
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:51 AM
 * */

package com.lemoo.auth.config;

import com.lemoo.auth.common.properties.AccessTokenProperties;
import com.lemoo.auth.common.properties.RefreshTokenProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({AccessTokenProperties.class, RefreshTokenProperties.class})
public class ApplicationConfig {}
