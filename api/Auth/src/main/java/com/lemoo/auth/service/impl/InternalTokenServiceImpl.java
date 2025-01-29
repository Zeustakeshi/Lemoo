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
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class InternalTokenServiceImpl implements InternalTokenService {

    private final KeyService keyService;

    @Value("${jwt.kid}")
    private String jwtKid;

    @Override
    public Map<String, Object> getJwkSets() {
        RSAKey rsaKey = new RSAKey.Builder(keyService.getAccessTokenPublicKey())
                .privateKey(keyService.getAccessTokenPrivateKey())
                .keyID(jwtKid)
                .build();
        JWKSet jwkSet = new JWKSet(rsaKey);
        return jwkSet.toJSONObject();
    }
}
