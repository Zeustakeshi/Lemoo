/*
 *  GoogleOAuthRequest
 *  @author: Minhhieuano
 *  @created 3/15/2025 6:49 PM
 * */


package com.lemoo.auth.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GoogleOAuthRequest {
    private String code;
    private String clientId;
    private String clientSecret;
    private String redirectUri;
    
    @Builder.Default
    private String grantType = "authorization_code";
}
