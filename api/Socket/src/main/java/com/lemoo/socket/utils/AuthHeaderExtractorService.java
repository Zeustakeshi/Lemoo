/*
 *  HeaderService
 *  @author: Minhhieuano
 *  @created 2/11/2025 5:59 PM
 * */


package com.lemoo.socket.utils;

import com.lemoo.socket.dto.common.AuthenticatedAccount;
import com.lemoo.socket.exception.NotAuthenticatedException;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.Authentication;

public class AuthHeaderExtractorService {

    private AuthHeaderExtractorService() {
    }

    public static AuthenticatedAccount extractAccountFormHeaderAccessor(SimpMessageHeaderAccessor headerAccessor) {
        Authentication authentication = (Authentication) headerAccessor.getUser();
        if (authentication == null) throw new NotAuthenticatedException("User not authenticated.");
        return (AuthenticatedAccount) authentication.getPrincipal();
    }
}
