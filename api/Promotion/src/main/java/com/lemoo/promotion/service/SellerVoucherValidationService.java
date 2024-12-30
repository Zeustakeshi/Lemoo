/*
 *  SellerVoucherValidationService
 *  @author: Minhhieuano
 *  @created 12/30/2024 10:41 PM
 * */


package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.request.SellerVoucherRequest;

public interface SellerVoucherValidationService {
    void validateRegularVoucher(SellerVoucherRequest request);
}
