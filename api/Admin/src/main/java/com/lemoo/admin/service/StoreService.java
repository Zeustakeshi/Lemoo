/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:05 PM
 * */


package com.lemoo.admin.service;


import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.dto.response.PageableResponse;
import com.lemoo.admin.entity.Store;

public interface StoreService {

    Store findByAccountId(String accountId);

    Store findByStoreId(String storeId);

    void saveStore(Store store);

    PageableResponse<Store> getAllStoreByStatus(StoreStatus status, int page, int limit);

    boolean activateStore(String storeId);

    boolean deactivateStore(String storeId);
}
