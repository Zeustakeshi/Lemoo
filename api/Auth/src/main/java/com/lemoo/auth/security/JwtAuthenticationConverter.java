/*
 *  JwtAuthenticationConvertor
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:35 AM
 * */

package com.lemoo.auth.security;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {
	private final UserDetailsService userDetailsService;

	@Override
	public AbstractAuthenticationToken convert(@NonNull Jwt jwt) {
		String accountId = jwt.getSubject();

		UserDetails account = userDetailsService.loadUserByUsername(accountId);

		return new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
	}
}
