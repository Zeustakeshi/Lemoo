/*
 *  GoogleOAuthTokenClient
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:48 PM
 * */

package com.lemoo.auth.client;

import com.lemoo.auth.dto.request.GoogleOAuthRequest;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "google-oauth-token", url = "${spring.security.oauth2.url.google.token-url}")
public interface GoogleOAuthTokenClient {

    @PostMapping(value = "/token", consumes = "application/x-www-form-urlencoded")
    ResponseEntity<String> getAccessToken(
            @RequestBody @Valid GoogleOAuthRequest request
    );
}
