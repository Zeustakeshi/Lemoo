/*
 *  BaseOAuthService
 *  @author: Minhhieuano
 *  @created 3/15/2025 4:58 PM
 * */


package com.lemoo.auth.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.auth.client.GoogleOAuthUserInfoClient;
import com.lemoo.auth.domain.OAuthAccount;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
@AllArgsConstructor
public abstract class BaseOAuthService {
    private final ObjectMapper mapper;
    private final GoogleOAuthUserInfoClient googleOAuthUserInfoClient;


    protected String extractGoogleAccessToken(String response) throws JsonProcessingException {
        JsonNode jsonNode = mapper.readTree(response);
        return jsonNode.get("access_token").asText();
    }

    protected OAuthAccount getGoogleUserInfo(String accessToken) throws JsonProcessingException {
        ResponseEntity<String> userInfoResponse = googleOAuthUserInfoClient.getUserInfo(
                "Bearer " + accessToken
        );

        String userInfo = userInfoResponse.getBody();
        JsonNode userInfoJson = mapper.readTree(userInfo);

        return OAuthAccount.builder()
                .name(userInfoJson.get("name").asText())
                .email(userInfoJson.get("email").asText())
                .picture(userInfoJson.get("picture").asText())
                .build();
    }

    protected String getOAuthUrl(String providerBaseUrl, String clientId, String scope, String callbackUri) {
        String responseType = "code";
        String encodedScope;

        encodedScope = URLEncoder.encode(scope, StandardCharsets.UTF_8);

        return providerBaseUrl + "?client_id=" + clientId + "&redirect_uri="
                + callbackUri + "&response_type="
                + responseType + "&scope="
                + encodedScope;
    }
}
