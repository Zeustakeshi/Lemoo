/*
 *  AccountServiceImpl
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:41 PM
 * */


package com.lemoo.auth.service.impl;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.exception.NotfoundException;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;

    @Override
    public void addAccountAuthority(String accountId, Role role) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotfoundException("Account not found"));
        account.addAuthority(role);
        accountRepository.save(account);
    }
}
