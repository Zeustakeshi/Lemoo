/*
 *  SellerVoucherProductService
 *  @author: Minhhieuano
 *  @created 1/1/2025 11:18 PM
 * */


package com.lemoo.promotion.service;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.UpdateVoucherProductRequest;

import java.util.Set;

public interface VoucherProductService {
    Set<String> updateVoucherProduct(String storeId, AuthenticatedAccount account, String voucherId, UpdateVoucherProductRequest request);
}