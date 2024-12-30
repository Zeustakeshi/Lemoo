/*
 *  AccountServiceImpl
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:02 PM
 * */

package com.lemoo.notification.service.impl;

import com.lemoo.notification.common.enums.MailType;
import com.lemoo.notification.service.AccountService;
import com.lemoo.notification.service.MailService;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
	private final MailService mailService;

	@Override
	public void sendAccountCreationOtp(String email, String otp) {
		mailService.sendMail(MailType.ACCOUNT_CREATION_OTP, Map.of("otpCode", otp), email);
	}
}
