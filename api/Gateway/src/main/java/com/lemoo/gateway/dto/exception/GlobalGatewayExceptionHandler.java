/*
 *  GlobalGatewayExceptionHandler
 *  @author: Minhhieuano
 *  @created 9/14/2024 12:01 AM
 * */

package com.vibio.gateway.exception;

import com.vibio.gateway.dto.response.ApiResponse;
import com.vibio.gateway.utils.JsonConvertor;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
@RequiredArgsConstructor
public class GlobalGatewayExceptionHandler implements ErrorWebExceptionHandler {

	private static final Logger log = LoggerFactory.getLogger(GlobalGatewayExceptionHandler.class);
	private final JsonConvertor jsonConvertor;

	@Override
	public Mono<Void> handle(ServerWebExchange exchange, Throwable ex) {

		log.error("Prefix= {} error: {}", exchange.getRequest().getPath(), ex.getMessage());

		HttpStatus status;
		String message;
		if (ex instanceof ApiException) {
			status = ((ApiException) ex).getStatus();
			message = ex.getMessage();
		} else {
			status = HttpStatus.INTERNAL_SERVER_ERROR;
			message = "An unexpected error occurred.";
		}

		exchange.getResponse().setStatusCode(status);
		exchange.getResponse().getHeaders().set(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE);

		byte[] bytes = jsonConvertor.convertObjectToJsonBytes(ApiResponse.error(message));

		return exchange.getResponse()
				.writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(bytes)));
	}
}
