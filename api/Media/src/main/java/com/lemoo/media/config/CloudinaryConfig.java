/*
 *  CloudianryConfig
 *  @author: Minhhieuano
 *  @created 12/10/2024 2:00 PM
 * */

package com.lemoo.media.config;

import com.cloudinary.Cloudinary;
import com.lemoo.media.common.properties.CloudinaryProperties;
import java.util.HashMap;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@EnableConfigurationProperties(CloudinaryProperties.class)
public class CloudinaryConfig {
	private final CloudinaryProperties cloudinaryProperties;

	@Bean
	public Cloudinary cloudinary() {
		Map<String, String> configs = new HashMap<>();
		configs.put("cloud_name", cloudinaryProperties.cloudName());
		configs.put("api_key", cloudinaryProperties.apiKey());
		configs.put("api_secret", cloudinaryProperties.apiSecret());
		return new Cloudinary(configs);
	}
}
