/*
 *  AuthService
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.dto.request.ResendOtpRequest;
import com.lemoo.auth.dto.request.VerifyOtpRequest;
import com.lemoo.auth.dto.response.OtpResponse;
import com.lemoo.auth.dto.response.TokenResponse;

public interface AuthService {

    // create account
    OtpResponse createAccount(CreateAccountRequest request);

    // create account resend otp
    void resendCreateAccountOtp(ResendOtpRequest request);

    // verify create account otp
    TokenResponse verifyCreateAccountOtp(VerifyOtpRequest request);


    // login with email and password

    // mfa resend otp

    // validate mfa otp

}
