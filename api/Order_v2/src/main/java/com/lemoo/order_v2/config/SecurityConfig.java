/*
 *  SecurityConfig
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:32 AM
 * */

package com.lemoo.order_v2.config;

import com.lemoo.order_v2.security.CustomAccessDeniedException;
import com.lemoo.order_v2.security.CustomAuthenticationEntryPoint;
import com.lemoo.order_v2.security.JwtAuthenticationConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

	private final JwtAuthenticationConverter jwtAuthenticationConverter;
	private final CustomAccessDeniedException accessDeniedHandler;
	private final CustomAuthenticationEntryPoint authenticationEntryPoint;

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(AbstractHttpConfigurer::disable)
				.sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.exceptionHandling(handler -> handler.authenticationEntryPoint(authenticationEntryPoint)
						.accessDeniedHandler(accessDeniedHandler))
				.authorizeHttpRequests(request -> request.anyRequest().authenticated())
				.oauth2ResourceServer(
						oauth -> oauth.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter))
								.authenticationEntryPoint(authenticationEntryPoint));
		return http.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}
}
