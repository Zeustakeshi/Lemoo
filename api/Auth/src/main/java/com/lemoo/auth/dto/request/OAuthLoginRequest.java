/*
 *  GoogleLoginRequest
 *  @author: Minhhieuano
 *  @created 3/15/2025 3:24 PM
 * */


package com.lemoo.auth.dto.request;

import jakarta.validation.Valid;
import lombok.Data;

@Data
@Valid
public class OAuthLoginRequest {
    private String code;
}
