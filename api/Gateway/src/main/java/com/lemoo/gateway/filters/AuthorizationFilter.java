/*
 *  AuthenticationFilter
 *  @author: Minhhieuano
 *  @created 9/14/2024 1:02 AM
 * */

package com.vibio.gateway.filters;

import com.vibio.gateway.common.ServiceEndpointProperties;
import com.vibio.gateway.dto.request.IntrospectTokenRequest;
import com.vibio.gateway.dto.response.ApiResponse;
import com.vibio.gateway.exception.ForbiddenException;
import com.vibio.gateway.exception.UnauthorizedException;
import io.micrometer.common.util.StringUtils;
import java.util.List;
import java.util.Objects;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class AuthorizationFilter extends AbstractGatewayFilterFactory<AuthorizationFilter.Config> {

	private final ServiceEndpointProperties serviceEndpoints;
	private final RestTemplate restTemplate;

	public AuthorizationFilter(ServiceEndpointProperties serviceEndpoints, RestTemplate restTemplate) {
		super(Config.class);
		this.serviceEndpoints = serviceEndpoints;
		this.restTemplate = restTemplate;
	}

	@Override
	public GatewayFilter apply(Config config) {
		return ((exchange, chain) -> {
			ServerHttpRequest request = exchange.getRequest();
			List<String> headers = request.getHeaders().get(HttpHeaders.AUTHORIZATION);

			if (headers == null) throw new UnauthorizedException("Missing Authorization Header!");

			String authHeader = headers.get(0);

			if (StringUtils.isEmpty(authHeader) || !authHeader.startsWith("Bearer ")) {
				throw new UnauthorizedException("The Authorization header must be in the format 'Bearer <token>'.");
			}

			String token = authHeader.substring(7);

			if (!introspectToken(token)) {
				throw new ForbiddenException("The provided token is invalid or expired.");
			}

			return chain.filter(exchange);
		});
	}

	private Boolean introspectToken(String token) {
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<IntrospectTokenRequest> requestEntity = new HttpEntity<>(new IntrospectTokenRequest(token), headers);

		ResponseEntity<ApiResponse<Boolean>> response = restTemplate.exchange(
				serviceEndpoints.userService() + "/user/token/introspect",
				HttpMethod.POST,
				requestEntity,
				new ParameterizedTypeReference<ApiResponse<Boolean>>() {});

		if (response.getStatusCode() == HttpStatus.OK) {
			return Objects.requireNonNull(response.getBody()).getData();
		} else {
			throw new ForbiddenException("Invalid token");
		}
	}

	public static class Config {}
}
