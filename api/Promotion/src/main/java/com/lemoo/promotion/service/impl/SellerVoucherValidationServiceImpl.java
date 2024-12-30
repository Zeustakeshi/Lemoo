/*
 *  SellerVoucherValidationServiceImpl
 *  @author: Minhhieuano
 *  @created 12/30/2024 10:42 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.dto.request.SellerVoucherRequest;
import com.lemoo.promotion.service.SellerVoucherValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerVoucherValidationServiceImpl implements SellerVoucherValidationService {
    @Override
    public void validateRegularVoucher(SellerVoucherRequest voucher) {

    }

}
