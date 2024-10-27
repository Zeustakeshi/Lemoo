/*
 *  LoggingFilter
 *  @author: Minhhieuano
 *  @created 10/27/2024 8:12 PM
 * */


package com.lemoo.gateway.filters;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@Slf4j
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        String originalUri = exchange.getRequest().getURI().toString();

        return chain.filter(exchange).then(Mono.fromRunnable(() -> {
            String redirectedUri = exchange.getAttribute("org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_REQUEST_URL_ATTR").toString();
            log.info("Request redirected from URL: {} to URL: {}", originalUri, redirectedUri);
        }));
    }

    @Override
    public int getOrder() {
        return -1;
    }
}