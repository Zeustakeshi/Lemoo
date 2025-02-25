/*
 *  UserStoreService
 *  @author: Minhhieuano
 *  @created 2/24/2025 10:30 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.common.AuthenticatedAccount;

public interface StoreFollowerService {
    boolean followStore(String storeId, AuthenticatedAccount account);

    boolean unFollowStore(String storeId, AuthenticatedAccount account);
}
