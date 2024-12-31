/*
 *  SellerVoucherValidationServiceImpl
 *  @author: Minhhieuano
 *  @created 12/30/2024 10:42 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.DiscountType;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.SellerVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.exception.BadRequestException;
import com.lemoo.promotion.service.SellerVoucherValidationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class SellerVoucherValidationServiceImpl implements SellerVoucherValidationService {
    @Override
    public void validateRegularVoucher(RegularVoucherRequest voucher) {
        validateVoucherTime(voucher);
        if (voucher.getDiscountType().equals(DiscountType.PERCENTAGE)) validatePercentageDiscount(voucher);

        if (!voucher.getDiscountType().equals(DiscountType.MONEY_VALUE)) return;

        if (voucher.getBudget() == null || voucher.getBudget() < 1) {
            throw new BadRequestException("The budget value cannot be null or less than 1 for the discount type MONEY_VALUE.");
        }

    }

    @Override
    public void validateStoreFollowerVoucher(StoreFollowerVoucherRequest voucher) {
        validateVoucherTime(voucher);
        validatePercentageDiscount(voucher);
    }

    @Override
    public void validateFirstPurchaseVoucher(SellerVoucherRequest voucher) {

    }

    private void validatePercentageDiscount(SellerVoucherRequest voucher) {
        if (voucher.getDiscountValue() == null || voucher.getDiscountValue() <= 0 || voucher.getDiscountValue() > 100) {
            throw new BadRequestException("Invalid discount value. The discount type PERCENTAGE must have a value between 1 and 100.");
        }

        if (voucher.getMaximumDiscountValue() == null || voucher.getMaximumDiscountValue() < 1) {
            throw new BadRequestException("The maximum discount value cannot be null or less than 1 for the discount type PERCENTAGE.");
        }
    }

    private void validateVoucherTime(SellerVoucherRequest voucher) {
        LocalDateTime startTime = voucher.getPeriodStartTime();
        LocalDateTime endTime = voucher.getPeriodEndTime();
        LocalDateTime startCollectionTime = voucher.getCollectStartTime();

        if (endTime.isBefore(startTime))
            throw new BadRequestException("Voucher start time must be before voucher end time");

        if (startCollectionTime != null && (endTime.isBefore(startCollectionTime) || startTime.isAfter(startCollectionTime))) {
            throw new BadRequestException("Voucher collection start time must be between voucher start time and voucher end time");

        }

    }
}
