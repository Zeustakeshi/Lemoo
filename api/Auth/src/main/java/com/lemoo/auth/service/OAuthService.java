/*
 *  OAuthService
 *  @author: Minhhieuano
 *  @created 3/15/2025 4:55 PM
 * */


package com.lemoo.auth.service;

import com.lemoo.auth.dto.request.OAuthLoginRequest;
import com.lemoo.auth.dto.response.TokenResponse;

public interface OAuthService {
    String getOAuthUrl();

    TokenResponse login(OAuthLoginRequest request);
}
