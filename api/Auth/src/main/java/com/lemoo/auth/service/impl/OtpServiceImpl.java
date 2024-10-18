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
import com.lemoo.auth.exception.InvalidOtpCodeException;
import com.lemoo.auth.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.Random;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpServiceImpl implements OtpService {

    private final ObjectMapper objectMapper;
    private final PasswordEncoder passwordEncoder;
    private final Jedis jedis;


    @Override
    @SneakyThrows
    public String sendOtp(OtpType type) {

        String plainOtp = generateOtp();

        Otp otp = Otp
                .builder()
                .type(type)
                .value(passwordEncoder.encode(plainOtp))
                .build();

        // save hash otp to redis
        jedis.setex(otp.getCode(), TimeUnit.MINUTES.toSeconds(3), objectMapper.writeValueAsString(otp));

        // send otp
        log.info("otp {}: send to notification >>-> {}", type, plainOtp);
        return otp.getCode();
    }

    @Override
    @SneakyThrows
    public String resendOtp(String otpCode, OtpType type) {
        // validate otpCode and type
        String otpString = jedis.get(otpCode);

        if (otpString == null) throw new InvalidOtpCodeException("Invalid otp code");

        Otp otp = objectMapper.readValue(otpString, Otp.class);

        if (!otp.getType().equals(type)) throw new InvalidOtpCodeException("Invalid otp code");

        // delete old otp
        jedis.del(otpCode);

        // send new otp
        return sendOtp(type);
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
                new Random(), new char[]{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}, 6);
    }

}


