/*
 *  LoggingFilter
 *  @author: Minhhieuano
 *  @created 10/27/2024 8:12 PM
 * */


package com.lemoo.gateway.filters;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.cloud.gateway.route.Route;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import static org.springframework.cloud.gateway.support.ServerWebExchangeUtils.GATEWAY_ROUTE_ATTR;

@Component
@Slf4j
public class LoggingFilter implements GlobalFilter, Ordered {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        Route route = exchange.getAttribute(GATEWAY_ROUTE_ATTR);
        log.info("Incoming request uri {} -> {} uri:{}", exchange.getRequest().getPath(), route.getId(), route.getUri());
        return chain.filter(exchange);
    }

    @Override
    public int getOrder() {
        return -1;
    }
}