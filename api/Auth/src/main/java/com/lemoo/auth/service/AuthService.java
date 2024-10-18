/*
 *  AuthService
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.dto.request.ResendOtpRequest;
import com.lemoo.auth.dto.response.OtpResponse;

public interface AuthService {

    // create account
    OtpResponse createAccount(CreateAccountRequest request);

    // create account resend otp
    void resendCreateAccountOtp(ResendOtpRequest request);

    // validate create account otp
    

    // login with email and password

    // mfa resend otp

    // validate mfa otp

}
