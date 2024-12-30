/*
 *  CustomAccessDeniedException
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:39 AM
 * */

package com.lemoo.notification.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerExceptionResolver;

@Component
public class CustomAccessDeniedException implements AccessDeniedHandler {

	private final HandlerExceptionResolver resolver;

	public CustomAccessDeniedException(
			@Qualifier("handlerExceptionResolver") HandlerExceptionResolver handlerExceptionResolver) {
		this.resolver = handlerExceptionResolver;
	}

	@Override
	public void handle(
			HttpServletRequest request, HttpServletResponse response, AccessDeniedException accessDeniedException)
			throws IOException, ServletException {
		resolver.resolveException(request, response, null, accessDeniedException);
	}
}
