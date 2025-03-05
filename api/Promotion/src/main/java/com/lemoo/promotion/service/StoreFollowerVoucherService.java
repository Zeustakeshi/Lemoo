/*
 *  StoreFollowerService
 *  @author: Minhhieuano
 *  @created 2/20/2025 4:51 PM
 * */


package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;

import java.util.Set;

public interface StoreFollowerVoucherService {
    String createVoucher(StoreFollowerVoucherRequest request, String storeId, AuthenticatedAccount account);

    StoreFollowerVoucherResponse findVoucherById(String voucherId, String storeId, AuthenticatedAccount account);

    void activateVoucher(String storeId, AuthenticatedAccount account, String voucherId);

    void deactivateVoucher(String storeId, AuthenticatedAccount account, String voucherId);

    void addSkuToVoucher(String voucherId, Set<String> skus, String storeId, AuthenticatedAccount account);
}
