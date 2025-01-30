/*
 *  AdminAuthService
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:34 AM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.dto.request.AdminLoginRequest;
import com.lemoo.auth.dto.response.TokenResponse;

public interface AdminAuthService {
    TokenResponse createAccount();

    TokenResponse login(AdminLoginRequest request);
}
