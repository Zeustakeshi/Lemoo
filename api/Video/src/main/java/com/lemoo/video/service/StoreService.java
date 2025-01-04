/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:55 PM
 * */

package com.lemoo.video.service;

import com.lemoo.video.dto.response.StoreInfoResponse;

public interface StoreService {


    StoreInfoResponse getStoreInfo(String accountId);

    void verifyStore(String accountId, String storeId);
}
