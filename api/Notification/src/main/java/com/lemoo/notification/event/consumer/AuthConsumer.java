/*
 *  AuthConsumer
 *  @author: Minhhieuano
 *  @created 3/24/2025 4:17 PM
 * */


package com.lemoo.notification.event.consumer;


import com.lemoo.notification.event.model.AccountCreationOtpEvent;
import com.lemoo.notification.service.OtpNotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AuthConsumer {
    private final OtpNotificationService otpNotificationService;

    @KafkaListener(topics = "auth-service.account.new.send-otp", groupId = "${spring.kafka.consumer.group-id}")
    public void sendAccountCreationOtp(AccountCreationOtpEvent event) {
        otpNotificationService.sendAccountCreationOtp(event.getEmail(), event.getOtp());
    }
}
