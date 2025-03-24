/*
 *  OtpNotificationServiceImpl
 *  @author: Minhhieuano
 *  @created 3/24/2025 3:40 PM
 * */


package com.lemoo.notification.service.impl;

import com.lemoo.notification.service.OtpNotificationService;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class OtpNotificationServiceImpl implements OtpNotificationService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    @Override
    @SneakyThrows
    public void sendAccountCreationOtp(String email, String otp) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true);

        helper.setTo(email);
        helper.setSubject("Complete Your Lemoo Account Setup with This OTP");

        Context context = new Context();
        context.setVariables(Map.of("otpCode", otp, "userEmail", email));
        helper.setText(templateEngine.process("account-creation", context), true);
        javaMailSender.send(mimeMessage);
    }
}
