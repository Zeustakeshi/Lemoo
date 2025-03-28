/*
 *  GhnRequestInterceptor
 *  @author: pc
 *  @created 3/28/2025 2:55 AM
 * */


package com.lemoo.shipping.config;

import feign.RequestInterceptor;
import feign.RequestTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class GhnRequestInterceptor implements RequestInterceptor {

    @Value("${secret.ghn.token}")
    private String token;

    @Value("${secret.ghn.shop_id}")
    private String shopId;

    @Override
    public void apply(RequestTemplate requestTemplate) {
        requestTemplate.header("token", token);
        requestTemplate.header("shopId", shopId);
    }
}
