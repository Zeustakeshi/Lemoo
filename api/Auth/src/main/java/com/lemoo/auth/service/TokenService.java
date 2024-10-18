/*
 *  TokenService
 *  @author: Minhhieuano
 *  @created 10/16/2024 12:54 AM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;

public interface TokenService {
    TokenResponse generateTokenPair(Account account);
}
