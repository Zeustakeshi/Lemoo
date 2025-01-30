/*
 *  ApplicationConfig
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:51 AM
 * */

package com.lemoo.auth.config;

import com.lemoo.auth.common.properties.AccessTokenProperties;
import com.lemoo.auth.common.properties.AdminProperties;
import com.lemoo.auth.common.properties.RefreshTokenProperties;
import com.lemoo.auth.service.AdminAuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({AccessTokenProperties.class, RefreshTokenProperties.class, AdminProperties.class})
@RequiredArgsConstructor
public class ApplicationConfig implements CommandLineRunner {

    private final AdminAuthService adminAuthService;

    @Override
    public void run(String... args) throws Exception {
        adminAuthService.createAccount();
    }
}
