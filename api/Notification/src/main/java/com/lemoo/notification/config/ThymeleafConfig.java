/*
 *  ThymeleafConfig
 *  @author: Minhhieuano
 *  @created 3/24/2025 3:46 PM
 * */


package com.lemoo.notification.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.spring6.SpringTemplateEngine;

@Configuration
@RequiredArgsConstructor
public class ThymeleafConfig {
    private final SpringTemplateEngine springTemplateEngine;

    @Bean
    public TemplateEngine thymeleafTemplateEngine() {
        return springTemplateEngine;
    }
}