/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.common.enums.StoreStatus;
import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.dto.request.CreateCorporateStoreRequest;
import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.StoreResponse;

public interface StoreService {
    StoreResponse getStoreInfo(AuthenticatedAccount account);

    StoreResponse createCorporateStore(AuthenticatedAccount account, CreateCorporateStoreRequest request);

    StoreResponse createIndividualStore(AuthenticatedAccount account, CreateIndividualStoreRequest request);

    void updateStoreStatus(String storeId, StoreStatus status);
}
