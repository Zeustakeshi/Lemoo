/*
 *  PromotionService
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:01 PM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.CollectedVoucherResponse;
import com.lemoo.promotion.dto.response.PageableResponse;
import com.lemoo.promotion.dto.response.UserVoucherResponse;

import java.util.Set;

public interface VoucherCollectionService {
    Boolean isCollectedVoucher(String userId, String voucherId);

    PageableResponse<UserVoucherResponse> getAllVoucherByStoreId(String storeId, int page, int limit);

    void checkOrderVoucher(String orderId, String userId, Set<String> promotions);

    CollectedVoucherResponse collectVoucher(AuthenticatedAccount account, String voucherId);

    PageableResponse<CollectedVoucherResponse> getAllCollectedVoucher(AuthenticatedAccount account, int page, int limit);
}
