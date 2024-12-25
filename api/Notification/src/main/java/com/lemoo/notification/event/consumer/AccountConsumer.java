/*
 *  AccountConsumer
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:00 PM
 * */


package com.lemoo.notification.event.consumer;

import com.lemoo.notification.event.eventModel.AccountCreationOtpEvent;
import com.lemoo.notification.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountConsumer {

    private final AccountService accountService;

    @KafkaListener(topics = "account_creation_otp", groupId = "${spring.kafka.consumer.group-id}")
    public void newUserEventListener(AccountCreationOtpEvent event) {
        accountService.sendAccountCreationOtp(event.getEmail(), event.getOtp());
    }
}
