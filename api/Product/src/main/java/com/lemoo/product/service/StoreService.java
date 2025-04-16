/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:55 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.response.StoreResponse;

public interface StoreService {
    StoreResponse getStoreInfo(String storeId);

    void verifyStore(String accountId, String storeId);
}
