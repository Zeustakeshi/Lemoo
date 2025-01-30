/*
 *  PromotionService
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:01 PM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.UserVoucherResponse;

import java.util.Set;

public interface UserVoucherService {
    void checkOrderVoucher(String orderId, String userId, Set<String> promotions);

    UserVoucherResponse collectVoucher(AuthenticatedAccount account, String voucherId);

}
