/*
 *  applicationConfig
 *  @author: Minhhieuano
 *  @created 12/13/2024 10:13 PM
 * */

package com.lemoo.media.config;

import com.lemoo.media.common.properties.ServiceUrl;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({ServiceUrl.class})
public class applicationConfig {}
