/*
 *  TokenResponse
 *  @author: Minhhieuano
 *  @created 10/18/2024 7:49 PM
 * */


package com.lemoo.auth.dto.response;

import com.lemoo.auth.domain.Token;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TokenResponse {
    Token accessToken;
    Token refreshToken;
}
