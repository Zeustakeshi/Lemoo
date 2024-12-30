/*
 *  InternalTokenServiceImpl
 *  @author: Minhhieuano
 *  @created 10/29/2024 3:18 PM
 * */

package com.lemoo.auth.service.impl;

import com.lemoo.auth.service.InternalTokenService;
import com.lemoo.auth.service.KeyService;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalTokenServiceImpl implements InternalTokenService {

	private final KeyService keyService;

	@Override
	public Map<String, Object> getJwkSets() {
		RSAKey rsaKey = new RSAKey.Builder(keyService.getAccessTokenPublicKey())
				.privateKey(keyService.getAccessTokenPrivateKey())
				.keyID("lemoo-client")
				.build();
		JWKSet jwkSet = new JWKSet(rsaKey);
		return jwkSet.toJSONObject();
	}
}
