/*
 *  AccountProducer
 *  @author: Minhhieuano
 *  @created 12/25/2024 2:31 PM
 * */

package com.lemoo.auth.event.producer;

import com.lemoo.auth.event.eventModel.AccountCreationOtpEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountProducer {
	private final KafkaTemplate<String, Object> accountTemplate;

	public void sendAccountCreationOtp(AccountCreationOtpEvent event) {
		accountTemplate.send("account_creation_otp", event);
	}
}
