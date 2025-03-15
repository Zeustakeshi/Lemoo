/*
 *  OAuthServiceImpl
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:27 PM
 * */


package com.lemoo.auth.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.auth.client.GoogleOAuthTokenClient;
import com.lemoo.auth.client.GoogleOAuthUserInfoClient;
import com.lemoo.auth.common.properties.GoogleOAuthProperties;
import com.lemoo.auth.common.properties.OAuthUrlProperties;
import com.lemoo.auth.domain.OAuthAccount;
import com.lemoo.auth.dto.request.GoogleOAuthRequest;
import com.lemoo.auth.dto.request.OAuthLoginRequest;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.service.AccountService;
import com.lemoo.auth.service.GoogleOAuthService;
import com.lemoo.auth.service.TokenService;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

@Service
public class GoogleOAuthServiceImpl extends BaseOAuthService implements GoogleOAuthService {

    private final GoogleOAuthProperties googleOAuthProperties;
    private final OAuthUrlProperties oAuthUrlProperties;
    private final GoogleOAuthTokenClient googleOAuthTokenClient;
    private final AccountService accountService;
    private final TokenService tokenService;

    public GoogleOAuthServiceImpl(
            ObjectMapper mapper,
            GoogleOAuthUserInfoClient googleOAuthUserInfoClient,
            GoogleOAuthProperties googleOAuthProperties,
            OAuthUrlProperties oAuthUrlProperties,
            AccountService accountService,
            TokenService tokenService,
            GoogleOAuthTokenClient googleOAuthTokenClient
    ) {
        super(mapper, googleOAuthUserInfoClient);
        this.oAuthUrlProperties = oAuthUrlProperties;
        this.googleOAuthProperties = googleOAuthProperties;
        this.accountService = accountService;
        this.tokenService = tokenService;
        this.googleOAuthTokenClient = googleOAuthTokenClient;
    }

    @Override
    public String getOAuthUrl() {
        return getOAuthUrl(
                oAuthUrlProperties.google().oauthUrl(),
                googleOAuthProperties.clientId(),
                "email profile",
                oAuthUrlProperties.clientRedirectUrl()
        );
    }

    @Override
    @SneakyThrows
    public TokenResponse login(OAuthLoginRequest request) {
        String googleAccessTokenResponse = googleOAuthTokenClient.getAccessToken(
                GoogleOAuthRequest.builder()
                        .code(request.getCode())
                        .clientId(googleOAuthProperties.clientId())
                        .clientSecret(googleOAuthProperties.clientSecret())
                        .redirectUri(oAuthUrlProperties.clientRedirectUrl())
                        .build()
        ).getBody();


        String accessToken = extractGoogleAccessToken(googleAccessTokenResponse);
        OAuthAccount oAuthAccount = getGoogleUserInfo(accessToken);
        Account account = accountService.upsertAccount(oAuthAccount);
        return tokenService.generateTokenPair(account);
    }

}
