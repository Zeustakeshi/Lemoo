/*
 *  AccountCreationOtpTemplate
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:53 AM
 * */

package com.lemoo.notification.mail;

import com.lemoo.notification.common.enums.MailType;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Component
@RequiredArgsConstructor
public class AccountCreationOtpTemplate implements MailTemplate {

	private final TemplateEngine templateEngine;

	@Override
	public String getSubject() {
		return "New account OTP";
	}

	@Override
	public String getContent(Map<String, Object> model) {
		Context context = new Context();
		context.setVariables(model);
		return templateEngine.process(MailType.ACCOUNT_CREATION_OTP.getTemplatePath(), context);
	}
}
