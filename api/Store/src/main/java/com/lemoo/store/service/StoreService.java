/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.StoreResponse;

public interface StoreService {
    StoreResponse getStoreInfo(String ownerId);

    StoreResponse createIndividualStore(String ownerId, CreateIndividualStoreRequest request);
}
