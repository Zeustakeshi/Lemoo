/*
 *  VoucherCreationServiceImpl
 *  @author: Minhhieuano
 *  @created 2/20/2025 1:47 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.DiscountType;
import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherStatus;
import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.BaseVoucherRequest;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.exception.BadRequestException;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.service.SkuService;
import com.lemoo.promotion.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public abstract class BaseVoucherService {

    private final BaseVoucherRepository voucherRepository;
    private final StoreService storeService;
    private final SkuService skuService;

    public final <T extends BaseVoucherRequest> String createVoucher(String storeId, AuthenticatedAccount account, T request) {
        // verify store
        storeService.verifyStore(account.getId(), storeId);

        validateVoucherTime(request);
        validateVoucherDiscount(request);
        customValidation(request);

        BaseVoucher voucher = mapToVoucher(request);
        setVoucherType(voucher);
        voucher.setStoreId(storeId);
        BaseVoucher newVoucher = voucherRepository.save(customVoucherBuilder(voucher));
        return newVoucher.getId();
    }

    public void activateVoucher(String storeId, AuthenticatedAccount account, String voucherId) {
        storeService.verifyStore(account.getId(), storeId);
        BaseVoucher voucher = voucherRepository.findByIdAndStoreId(voucherId, storeId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (!canActivateVoucher(voucher)) {
            throw new ForbiddenException("This voucher can't activate");
        }


        if (voucher.getStatus().equals(VoucherStatus.ACTIVE)) return;

        voucher.setStatus(VoucherStatus.ACTIVE);
        voucherRepository.save(voucher);
    }

    public void deactivateVoucher(String storeId, AuthenticatedAccount account, String voucherId) {
        storeService.verifyStore(account.getId(), storeId);
        BaseVoucher voucher = voucherRepository.findByIdAndStoreId(voucherId, storeId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (!canDeactivateVoucher(voucher)) {
            throw new ForbiddenException("This voucher can't deactivate");
        }

        if (voucher.getStatus().equals(VoucherStatus.NOT_ACTIVE)) return;

        voucher.setStatus(VoucherStatus.NOT_ACTIVE);

        voucherRepository.save(voucher);
    }

    public void addSkuToVoucher(String voucherId, Set<String> skus, String storeId, AuthenticatedAccount account) {
        storeService.verifyStore(account.getId(), storeId);
        BaseVoucher voucher = voucherRepository.findByIdAndStoreId(voucherId, storeId)
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (!voucher.getScope().equals(VoucherScope.SPECIFIC_PRODUCT)) {
            throw new ForbiddenException("The voucher does not support apply specific product.");
        }
        Map<String, Boolean> validateResults = skuService.validateSkus(skus);

        skus.forEach(sku -> {
            if (!validateResults.containsKey(sku) ||
                    (validateResults.containsKey(sku) && !validateResults.get(sku))
            ) {
                throw new NotfoundException("Sku " + sku + " not found.");
            }

        });

        voucher.setSkus(skus);

        voucherRepository.save(voucher);
    }

    protected BaseVoucher findVoucherById(String voucherId, String storeId, AuthenticatedAccount account, VoucherType type) {
        storeService.verifyStore(account.getId(), storeId);
        return voucherRepository.findByIdAndStoreIdAndVoucherType(voucherId, storeId, type)
                .orElseThrow(() -> new NotfoundException("Voucher not found"));
    }

    protected void validateVoucherTime(BaseVoucherRequest voucher) {
        LocalDateTime startTime = voucher.getPeriodStartTime();
        LocalDateTime endTime = voucher.getPeriodEndTime();
        LocalDateTime startCollectionTime = voucher.getCollectStartTime();

        if (endTime.isBefore(startTime))
            throw new BadRequestException("Voucher start time must be before voucher end time");

        if (startCollectionTime != null && (endTime.isBefore(startCollectionTime) || startTime.isAfter(startCollectionTime))) {
            throw new BadRequestException("Voucher collection start time must be between voucher start time and voucher end time");

        }
    }

    protected void validateVoucherDiscount(BaseVoucherRequest voucher) {
        if (voucher.getDiscountType().equals(DiscountType.MONEY_VALUE)) return;

        if (voucher.getDiscountValue() == null || voucher.getDiscountValue() <= 0 || voucher.getDiscountValue() > 100) {
            throw new BadRequestException("Invalid discount value. The discount type PERCENTAGE must have a value between 1 and 100.");
        }

        if (voucher.getMaximumDiscountValue() == null || voucher.getMaximumDiscountValue() < 1) {
            throw new BadRequestException("The maximum discount value cannot be null or less than 1 for the discount type PERCENTAGE.");
        }
    }

    protected abstract void setVoucherType(BaseVoucher voucher);

    protected abstract BaseVoucher mapToVoucher(BaseVoucherRequest request);

    protected void customValidation(BaseVoucherRequest request) {
    }

    protected <T extends BaseVoucher> T customVoucherBuilder(T voucher) {
        return voucher;
    }

    protected boolean canActivateVoucher(BaseVoucher voucher) {
        LocalDateTime now = LocalDateTime.now();
        return !voucher.getPeriodEndTime().isBefore(now) && !voucher.getCollectStartTime().isBefore(now);
    }

    protected boolean canDeactivateVoucher(BaseVoucher voucher) {
        return true;
    }
}
