/*
 *  GoogleOAuthClient
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:48 PM
 * */

package com.lemoo.auth.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "google-oauth-user-info", url = "${spring.security.oauth2.url.google.user-url}")
public interface GoogleOAuthUserInfoClient {

    @GetMapping("/oauth2/v3/userinfo")
    ResponseEntity<String> getUserInfo(
            @RequestHeader("Authorization") String authorizationHeader
    );
}
