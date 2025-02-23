/*
 *  RegularVoucherService
 *  @author: Minhhieuano
 *  @created 2/20/2025 2:08 PM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;

public interface RegularVoucherService {
    String createVoucher(RegularVoucherRequest request, String storeId, AuthenticatedAccount account);

    RegularVoucherResponse findVoucherById(String voucherId, String storeId, AuthenticatedAccount account);

    void activateVoucher(String storeId, AuthenticatedAccount account, String voucherId);

    void deactivateVoucher(String storeId, AuthenticatedAccount account, String voucherId);
}
