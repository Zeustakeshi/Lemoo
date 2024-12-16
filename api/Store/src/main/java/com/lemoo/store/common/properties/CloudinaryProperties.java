/*
 *  CloudinaryProperties
 *  @author: Minhhieuano
 *  @created 12/10/2024 2:01 PM
 * */

package com.lemoo.store.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cloudinary")
public record CloudinaryProperties(
		String cloudName, String apiKey, String apiSecret, String dirPrefix, Integer secureUrlExpireIn) {}
