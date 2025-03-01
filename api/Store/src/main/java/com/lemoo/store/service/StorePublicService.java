/*
 *  UserStoreService
 *  @author: Minhhieuano
 *  @created 3/1/2025 8:56 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.response.StorePublicResponse;

public interface StorePublicService {
    StorePublicResponse getStoreInfo(String storeId);
}
