/*
 *  StoreVoucherService
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;

public interface SellerVoucherService {
    String createRegularVoucher(String storeId, AuthenticatedAccount account, RegularVoucherRequest request);

   
}
