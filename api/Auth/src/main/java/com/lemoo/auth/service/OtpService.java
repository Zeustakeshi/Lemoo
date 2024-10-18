/*
 *  OtpService
 *  @author: Minhhieuano
 *  @created 10/18/2024 3:47 PM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.common.enums.OtpType;

public interface OtpService {
    String sendOtp(OtpType type);

    String resendOtp(String otpCode, OtpType type);

    boolean verifyOtp(String otpCode, String plainOtp);

    void clearOtp(String otpCode);
}
