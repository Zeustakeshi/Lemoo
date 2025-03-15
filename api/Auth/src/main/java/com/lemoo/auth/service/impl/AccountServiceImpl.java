/*
 *  AccountServiceImpl
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:41 PM
 * */


package com.lemoo.auth.service.impl;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.domain.OAuthAccount;
import com.lemoo.auth.entity.Account;
import com.lemoo.auth.event.eventModel.NewUserEvent;
import com.lemoo.auth.event.producer.UserProducer;
import com.lemoo.auth.exception.NotfoundException;
import com.lemoo.auth.mapper.AccountMapper;
import com.lemoo.auth.repository.AccountRepository;
import com.lemoo.auth.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {

    private final AccountRepository accountRepository;
    private final UserProducer userProducer;
    private final AccountMapper accountMapper;

    @Override
    public Account upsertAccount(OAuthAccount oAuthAccount) {
        Optional<Account> accountOptional = accountRepository.findByEmail(oAuthAccount.getEmail());
        return accountOptional.orElseGet(() -> createAccount(accountMapper.toAccount(oAuthAccount)));
    }

    @Override
    public Account createAccount(Account account) {
        account.setAuthorities(Set.of(Role.USER));
        Account newAccount = accountRepository.save(account);
        userProducer.createUserProfile(NewUserEvent.builder()
                .accountId(newAccount.getId())
                .userId(newAccount.getProfileId())
                .displayName(newAccount.getUsername())
                .avatar(account.getDefaultAvatar())
                .build());
        return newAccount;
    }

    @Override
    public void addAccountAuthority(String accountId, Role role) {
        Account account = accountRepository.findById(accountId)
                .orElseThrow(() -> new NotfoundException("Account not found"));
        account.addAuthority(role);
        accountRepository.save(account);
    }
}
