/*
 *  MailType
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:42 AM
 * */

package com.lemoo.notification.common.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum MailType {
	ACCOUNT_CREATION_OTP(1, "account-creation-otp");

	private final Integer id;
	private final String templatePath;
}
