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
import com.lemoo.promotion.entity.CollectedVoucher;

import java.util.Set;

public interface VoucherCollectionService {
    Boolean isCollectedVoucher(String userId, String voucherId);

    CollectedVoucher findByIdAndUserId(String voucherId, String userId);

    PageableResponse<UserVoucherResponse> getAllVoucherByStoreId(String storeId, int page, int limit);

    CollectedVoucherResponse collectVoucher(AuthenticatedAccount account, String voucherId);

    PageableResponse<CollectedVoucherResponse> getAllCollectedVoucher(AuthenticatedAccount account, int page, int limit);

    void updateUserVoucherQuantity(String userId, Set<String> vouchers, int amount) throws Exception;

    void compensateVoucher(String userId, Set<String> vouchers) throws Exception;
}
