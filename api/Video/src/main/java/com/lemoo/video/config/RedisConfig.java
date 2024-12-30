/*
 *  RedisConfig
 *  @author: Minhhieuano
 *  @created 10/18/2024 3:43 PM
 * */

package com.lemoo.video.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import redis.clients.jedis.Jedis;

@Configuration
public class RedisConfig {
	@Value("${cache.redis_url}")
	private String redisUrl;

	@Bean
	public Jedis jedis() {
		return new Jedis(redisUrl);
	}
}
