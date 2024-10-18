/*
 *  AuthServiceImpl
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */

package com.lemoo.auth.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.auth.AccountMapper;
import com.lemoo.auth.common.enums.OtpType;
import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.domain.AccountConfirmation;
import com.lemoo.auth.domain.AccountOtpInformation;
import com.lemoo.auth.dto.request.CreateAccountRequest;
import com.lemoo.auth.dto.request.ResendOtpRequest;
import com.lemoo.auth.dto.request.VerifyOtpRequest;
import com.lemoo.auth.dto.response.OtpResponse;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.exception.BadRequestException;
import com.lemoo.auth.exception.ConflictException;
import com.lemoo.auth.exception.ForbiddenException;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AuthService;
import com.lemoo.auth.service.OtpService;
import com.lemoo.auth.service.TokenService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;

import java.util.Optional;
import java.util.Set;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private static final Integer MAXIMUM_NUMBER_OF_VALIDATE_OTP_REQUEST = 3;

    private final AccountRepository accountRepository;
    private final AccountMapper accountMapper;
    private final PasswordEncoder passwordEncoder;
    private final Jedis jedis;
    private final ObjectMapper objectMapper;
    private final OtpService otpService;
    private final TokenService tokenService;

    @Value("${assets.default-avatar-man}")
    private String defaultAvatarMan;

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

    @Override
    @SneakyThrows
    public TokenResponse verifyCreateAccountOtp(VerifyOtpRequest request) {

        // verify otp and get account confirmation
        AccountConfirmation accountConfirmation = verifyOtpAndRetrieveData(request, AccountConfirmation.class);

        // create new account
        Account account = accountMapper.accountConfirmationToAccount(accountConfirmation);
        account.setAuthorities(Set.of(Role.USER));
        account.setAvatar(defaultAvatarMan);

        return tokenService.generateTokenPair(accountRepository.save(account));
    }

    @SneakyThrows
    private <T extends AccountOtpInformation> T verifyOtpAndRetrieveData(VerifyOtpRequest request, Class<T> clazz) {
        // validate account confirmation code
        String otpDataJson = Optional.ofNullable(jedis.get(request.getCode()))
                .orElseThrow(() ->
                        new BadRequestException("Invalid or expired OTP code. Please request a new OTP.")
                );

        T otpData = objectMapper.readValue(otpDataJson, clazz);

        String validationCode = otpData.getCode();

        if (otpData.getValidationCount() >= MAXIMUM_NUMBER_OF_VALIDATE_OTP_REQUEST) {

            clearValidationInfo(validationCode, otpData.getOtpCode());

            throw new ForbiddenException("OTP validation limit exceeded. Please request a new OTP.");
        }

        if (!otpService.verifyOtp(otpData.getOtpCode(), request.getOtp())) {
            // update validation count
            otpData.setValidationCount(otpData.getValidationCount() + 1);
            jedis.setex(
                    validationCode,
                    jedis.ttl(validationCode),
                    objectMapper.writeValueAsString(otpData)
            );

            throw new BadRequestException("Invalid or expired OTP code. Please request a new OTP.");
        }

        clearValidationInfo(validationCode, otpData.getOtpCode());

        return otpData;
    }

    private void clearValidationInfo(String validationCode, String otpCode) {
        jedis.del(validationCode);
        otpService.clearOtp(otpCode);
    }
}
