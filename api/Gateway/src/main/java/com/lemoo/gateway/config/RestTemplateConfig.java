/*
 *  RestTemplateConfig
 *  @author: Minhhieuano
 *  @created 9/14/2024 1:31 AM
 * */

package com.vibio.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class RestTemplateConfig {
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}
}
