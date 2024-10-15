/*
 *  AuthServiceImpl
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:21 PM
 * */


package com.lemoo.auth.service.impl;

import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final AccountRepository accountRepository;
}
