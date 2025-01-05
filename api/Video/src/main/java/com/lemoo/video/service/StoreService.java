/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:55 PM
 * */

package com.lemoo.video.service;

import com.lemoo.video.dto.response.InternalStoreResponse;

public interface StoreService {


    InternalStoreResponse getStoreInfo(String accountId);

    void verifyStore(String accountId, String storeId);
}
