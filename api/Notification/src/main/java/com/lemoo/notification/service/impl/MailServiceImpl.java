/*
 *  MailServiceImpl
 *  @author: Minhhieuano
 *  @created 12/25/2024 1:59 AM
 * */

package com.lemoo.notification.service.impl;

import com.lemoo.notification.common.enums.MailType;
import com.lemoo.notification.mail.MailTemplate;
import com.lemoo.notification.mail.MailTemplateFactory;
import com.lemoo.notification.service.MailService;
import jakarta.mail.internet.MimeMessage;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {

	private final MailTemplateFactory mailTemplateFactory;
	private final JavaMailSender javaMailSender;

	@Override
	public void sendMail(MailType mailType, Map<String, Object> model, String recipient) {
		MailTemplate mailTemplate = mailTemplateFactory.getMailTemplate(mailType);

		try {
			MimeMessage mimeMessage = javaMailSender.createMimeMessage();
			MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

			helper.setTo(recipient);
			helper.setSubject(mailTemplate.getSubject());
			helper.setText(mailTemplate.getContent(model), true); // true -> HTML content

			javaMailSender.send(mimeMessage);
		} catch (Exception ex) {
			log.error("Send mail {} error: {}", mailType, ex.getMessage());
		}
	}
}
