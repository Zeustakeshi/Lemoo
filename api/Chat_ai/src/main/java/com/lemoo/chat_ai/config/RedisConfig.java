/*
 *  RedisConfig
 *  @author: Minhhieuano
 *  @created 10/18/2024 3:43 PM
 * */

package com.lemoo.chat_ai.config;

import org.redisson.Redisson;
import org.redisson.api.RedissonClient;
import org.redisson.config.Config;
import org.redisson.config.TransportMode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RedisConfig {
    @Value("${cache.redis_url}")
    private String redisUrl;

    @Bean
    RedissonClient redisClient() {
        Config config = new Config();
        config.setTransportMode(TransportMode.NIO);
        config.useSingleServer()
                .setAddress(redisUrl);
        return Redisson.create(config);
    }
}
