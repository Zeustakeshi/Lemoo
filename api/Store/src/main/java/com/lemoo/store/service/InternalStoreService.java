/*
 *  InternalStoreService
 *  @author: Minhhieuano
 *  @created 12/26/2024 5:48 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.request.VerifyStoreRequest;
import com.lemoo.store.dto.response.InternalStoreResponse;

import java.util.Set;

public interface InternalStoreService {
    boolean verifyStore(VerifyStoreRequest request);

    InternalStoreResponse getStoreInfoByAccountId(String accountId);

    Set<String> getStoreFollowers(String storeId);
}
