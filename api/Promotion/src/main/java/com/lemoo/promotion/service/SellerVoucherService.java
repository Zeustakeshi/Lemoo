/*
 *  StoreVoucherService
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.FirstPurchaseVoucherResponse;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;

public interface SellerVoucherService {

    String createRegularVoucher(String storeId, AuthenticatedAccount account, RegularVoucherRequest request);

    String createStoreFollowerVoucher(String storeId, AuthenticatedAccount account, StoreFollowerVoucherRequest request);

    String createFirstPurchaseVoucher(String storeId, AuthenticatedAccount account, FirstPurchaseVoucherRequest request);

    void activateVoucher(String storeId, AuthenticatedAccount account, String voucherId);

    void deactivateVoucher(String storeId, AuthenticatedAccount account, String voucherId);


    RegularVoucherResponse getRegularVoucherById(String storeId, AuthenticatedAccount account, String voucherId);

    StoreFollowerVoucherResponse getStoreFollowerVoucherById(String storeId, AuthenticatedAccount account, String voucherId);

    FirstPurchaseVoucherResponse getFirstPurchaseVoucherById(String storeId, AuthenticatedAccount account, String voucherId);

}
