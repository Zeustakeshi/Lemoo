/*
 *  AdminAuthServiceImpl
 *  @author: Minhhieuano
 *  @created 1/12/2025 11:34 AM
 * */


package com.lemoo.auth.service.impl;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.dto.request.AdminCreateAccountRequest;
import com.lemoo.auth.dto.request.AdminLoginRequest;
import com.lemoo.auth.dto.response.TokenResponse;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.event.eventModel.NewUserEvent;
import com.lemoo.auth.event.producer.UserProducer;
import com.lemoo.auth.exception.ConflictException;
import com.lemoo.auth.exception.ForbiddenException;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AdminAuthService;
import com.lemoo.auth.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class AdminAuthServiceImpl implements AdminAuthService {

    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenService tokenService;
    private final UserProducer userProducer;

    @Override
    public TokenResponse createAccount(AdminCreateAccountRequest request) {
        if (accountRepository.existsByEmailAndAuthority(request.getEmail(), Role.ADMIN)) {
            throw new ConflictException("The admin account already exists. You cannot create an admin account directly. Please contact the admin to add an account.");
        }

        Account account = accountRepository.save(Account.builder()
                .email(request.getEmail())
                .phone("none")
                .password(passwordEncoder.encode(request.getPassword()))
                .username(request.getEmail())
                .authorities(Set.of(Role.ADMIN))
                .build());

        userProducer.createUserProfile(NewUserEvent.builder()
                .accountId(account.getId())
                .userId(account.getProfileId())
                .displayName(account.getUsername())
                .build());
        return tokenService.generateTokenPair(account);
    }

    @Override
    public TokenResponse login(AdminLoginRequest request) {
        Account account = accountRepository.findByEmailAndAuthority(request.getEmail(), Role.ADMIN)
                .orElseThrow(() -> new ForbiddenException("Wrong username or password"));

        if (!passwordEncoder.matches(request.getPassword(), account.getPassword())) {
            throw new ForbiddenException("Wrong username or password");
        }
        return tokenService.generateTokenPair(account);
    }
}
