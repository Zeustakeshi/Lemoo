/*
 *  MailTemplateFactory
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:41 AM
 * */

package com.lemoo.notification.mail;

import com.lemoo.notification.common.enums.MailType;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MailTemplateFactory {

	private final AccountCreationOtpTemplate accountCreationMailTemplate;

	public MailTemplate getMailTemplate(MailType mailType) {
		switch (mailType) {
			case ACCOUNT_CREATION_OTP:
				return accountCreationMailTemplate;
			default:
				throw new IllegalArgumentException("Invalid mail type");
		}
	}
}
