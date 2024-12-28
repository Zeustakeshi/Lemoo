/*
 *  OtpServiceImpl
 *  @author: Minhhieuano
 *  @created 10/18/2024 3:52 PM
 * */

package com.lemoo.auth.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.auth.common.enums.OtpType;
import com.lemoo.auth.domain.Otp;
import com.lemoo.auth.event.eventModel.AccountCreationOtpEvent;
import com.lemoo.auth.event.producer.AccountProducer;
import com.lemoo.auth.exception.ForbiddenException;
import com.lemoo.auth.exception.InvalidOtpCodeException;
import com.lemoo.auth.service.OtpService;
import java.util.Random;
import java.util.concurrent.TimeUnit;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {
	private static final Integer MAXIMUM_NUMBER_OF_SEND_OTP_REQUEST = 5;
	private static final Integer OTP_SIZE = 6;
	private static final Long OTP_EXPIRED_TIME = TimeUnit.MINUTES.toSeconds(3);

	private final ObjectMapper objectMapper;
	private final PasswordEncoder passwordEncoder;
	private final Jedis jedis;
	private final AccountProducer accountProducer;

	@Override
	@SneakyThrows
	public String sendOtp(OtpType type, String targetEmail) {
		return sendOtpWithResendCount(type, targetEmail, 0);
	}

	@SneakyThrows
	public String resendOtp(String otpCode, String targetEmail, OtpType type) {
		String otpString = jedis.get(otpCode);

		int resendCount = 0;

		if (otpString != null) {
			Otp existingOtp = objectMapper.readValue(otpString, Otp.class);
			if (!existingOtp.getType().equals(type)) {
				throw new InvalidOtpCodeException("OTP code does not match the requested type.");
			}

			if (existingOtp.getResendCount() >= MAXIMUM_NUMBER_OF_SEND_OTP_REQUEST) {
				throw new ForbiddenException(
						"You have reached the limit for OTP resend attempts. Please try again later.");
			}

			resendCount = existingOtp.getResendCount() + 1;
		}

		jedis.del(otpCode);

		return sendOtpWithResendCount(type, targetEmail, resendCount);
	}

	@SneakyThrows
	private String sendOtpWithResendCount(OtpType type, String targetEmail, int resendCount) {
		String plainOtp = generateOtp();

		Otp otp = Otp.builder()
				.type(type)
				.value(passwordEncoder.encode(plainOtp))
				.resendCount(resendCount)
				.build();

		jedis.setex(otp.getCode(), OTP_EXPIRED_TIME, objectMapper.writeValueAsString(otp));

		accountProducer.sendAccountCreationOtp(AccountCreationOtpEvent.builder()
				.email(targetEmail)
				.otp(plainOtp)
				.build());

		return otp.getCode();
	}

	@Override
	@SneakyThrows
	public boolean verifyOtp(String otpCode, String plainOtp) {
		String otpString = jedis.get(otpCode);
		if (otpString == null) return false;
		Otp otp = objectMapper.readValue(otpString, Otp.class);
		return passwordEncoder.matches(plainOtp, otp.getValue());
	}

	@Override
	public void clearOtp(String otpCode) {
		jedis.del(otpCode);
	}

	private String generateOtp() {
		return NanoIdUtils.randomNanoId(
				new Random(), new char[] {'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}, OTP_SIZE);
	}
}
