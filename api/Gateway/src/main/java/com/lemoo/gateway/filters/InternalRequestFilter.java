/*
 *  InternalEnpointFilter
 *  @author: Minhhieuano
 *  @created 9/13/2024 11:50 PM
 * */

package com.vibio.gateway.filters;

import com.vibio.gateway.exception.ForbiddenException;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.Ordered;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class InternalRequestFilter implements GlobalFilter, Ordered {
	@Override
	public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
		ServerHttpRequest request = exchange.getRequest();

		String path = request.getURI().getPath();

		if (path.contains("/internal")) {
			throw new ForbiddenException("Forbidden!!");
		}
		return chain.filter(exchange);
	}

	@Override
	public int getOrder() {
		return -2;
	}
}
