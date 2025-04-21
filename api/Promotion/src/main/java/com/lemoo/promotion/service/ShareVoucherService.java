/*
 *  ShareVoucherService
 *  @author: pc
 *  @created 4/21/2025 10:04 AM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.ShareVoucherRequest;

public interface ShareVoucherService {
    String shareVoucher(ShareVoucherRequest request, AuthenticatedAccount account);

    String collectSharedVoucher(String transactionId, AuthenticatedAccount account);
}
