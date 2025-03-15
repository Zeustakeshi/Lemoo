/*
 *  AccountService
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:40 PM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.domain.OAuthAccount;
import com.lemoo.auth.entity.Account;

public interface AccountService {
    Account createAccount(Account account);

    Account upsertAccount(OAuthAccount oAuthAccount);

    void addAccountAuthority(String accountId, Role role);
}
