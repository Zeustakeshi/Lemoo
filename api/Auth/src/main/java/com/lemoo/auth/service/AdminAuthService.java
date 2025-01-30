/*
 *  AdminAuthService
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:34 AM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.domain.Token;
import com.lemoo.auth.dto.request.AdminLoginRequest;

public interface AdminAuthService {
    void createAccount();

    Token login(AdminLoginRequest request);
}
