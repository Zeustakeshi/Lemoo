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
import com.lemoo.auth.dto.request.ResendOtpRequest;
import com.lemoo.auth.dto.response.OtpResponse;
import com.lemoo.auth.exception.BadRequestException;
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
        accountConfirmation.setPassword(passwordEncoder.encode(accountConfirmation.getPassword()));

        String otpCode = otpService.sendOtp(OtpType.ACCOUNT_CREATION);

        accountConfirmation.setOtpCode(otpCode);

        jedis.setex(accountConfirmation.getCode(), TimeUnit.MINUTES.toSeconds(15), objectMapper.writeValueAsString(accountConfirmation));

        return new OtpResponse(accountConfirmation.getCode());
    }

    @Override
    @SneakyThrows
    public void resendCreateAccountOtp(ResendOtpRequest request) {

        // validate account confirmation code
        String accountConfirmationString = jedis.get(request.getCode());

        if (accountConfirmationString == null) {
            throw new BadRequestException("Invalid otp code.");
        }

        AccountConfirmation accountConfirmation = objectMapper.readValue(accountConfirmationString, AccountConfirmation.class);

        String otpCode = otpService.resendOtp(accountConfirmation.getOtpCode(), OtpType.ACCOUNT_CREATION);

        // update account confirmation
        accountConfirmation.setOtpCode(otpCode);

        jedis.setex(
                accountConfirmation.getCode(),
                jedis.ttl(accountConfirmation.getCode()),
                objectMapper.writeValueAsString(accountConfirmation)
        );

    }
}
