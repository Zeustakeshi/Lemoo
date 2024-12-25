/*
 *  CloudinaryProperties
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:51 PM
 * */

package com.lemoo.media.common.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "cloudinary")
public record CloudinaryProperties(
        String cloudName, String apiKey, String apiSecret, String dirPrefix, Integer secureUrlExpireIn) {
}
