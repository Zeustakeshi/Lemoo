/*
 *  SellerVoucherValidationService
 *  @author: Minhhieuano
 *  @created 12/30/2024 10:41 PM
 * */


package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.SellerVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;

public interface SellerVoucherValidationService {
    void validateRegularVoucher(RegularVoucherRequest voucher);

    void validateStoreFollowerVoucher(StoreFollowerVoucherRequest voucher);

    void validateFirstPurchaseVoucher(SellerVoucherRequest voucher);
}
