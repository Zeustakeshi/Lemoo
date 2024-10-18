/*
 *  AuthServiceImpl
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */

package com.lemoo.auth.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.auth.AccountMapper;
import com.lemoo.auth.common.enums.OtpType;
import com.lemoo.auth.domain.AccountConfirmation;
import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.dto.response.OtpResponse;
import com.lemoo.auth.exception.ConflictException;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AuthService;
import com.lemoo.auth.service.OtpService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final PasswordEncoder passwordEncoder;
    private final Jedis jedis;
    private final ObjectMapper objectMapper;
    private final OtpService otpService;

    @SneakyThrows
    @Override
    public OtpResponse createAccount(CreateAccountRequest request) {
        if (accountRepository.existsByPhoneOrEmail(request.getPhone(), request.getEmail())) {
            throw new ConflictException("Account phone or email already existed.");
        }

        AccountConfirmation accountConfirmation = accountMapper.createAccountRequestToAccountConfirmation(request);
        accountConfirmation.setPassword(passwordEncoder.encode(accountConfirmation.getPassword()));

        jedis.setex(accountConfirmation.getCode(), TimeUnit.MINUTES.toSeconds(15), objectMapper.writeValueAsString(accountConfirmation));

        String otpCode = otpService.sendOtp(OtpType.ACCOUNT_CREATION);

        return new OtpResponse(otpCode);
    }
}
