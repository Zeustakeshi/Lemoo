/*
 *  OtpNotificationService
 *  @author: Minhhieuano
 *  @created 3/24/2025 3:39 PM
 * */

package com.lemoo.notification.service;

public interface OtpNotificationService {
    void sendAccountCreationOtp(String email, String otp);
}
