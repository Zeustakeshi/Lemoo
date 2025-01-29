/*
 *  AccountService
 *  @author: Minhhieuano
 *  @created 1/29/2025 3:40 PM
 * */

package com.lemoo.auth.service;

import com.lemoo.auth.common.enums.Role;

public interface AccountService {
    void addAccountAuthority(String accountId, Role role);
}
