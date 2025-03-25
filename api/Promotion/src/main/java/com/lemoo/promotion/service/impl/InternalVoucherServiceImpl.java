/*
 *  InternalVoucherServiceImpl
 *  @author: pc
 *  @created 3/26/2025 12:20 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.dto.request.InternalValidateVoucherRequest;
import com.lemoo.promotion.entity.BaseVoucher;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.repository.BaseVoucherRepository;
import com.lemoo.promotion.service.InternalVoucherService;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InternalVoucherServiceImpl implements InternalVoucherService {

    private final BaseVoucherRepository baseVoucherRepository;
    private final VoucherCollectionService voucherCollectionService;

    @Override
    public Boolean canApplyVoucher(InternalValidateVoucherRequest request) {

        Set<String> voucherIds = request.getVoucherIds();
        Set<String> skus = request.getSkus();
        String userId = request.getUserId();

        for (String voucherId : voucherIds) {
            BaseVoucher voucher = baseVoucherRepository.findById(voucherId)
                    .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

            boolean isCollected = voucherCollectionService.isCollectedVoucher(userId, voucherId);
            if (!isCollected) {
                throw new ForbiddenException("User not collected voucher " + voucherId);
            }

            if (voucher.getPeriodEndTime().isBefore(LocalDateTime.now())) {
                throw new ForbiddenException("Voucher " + voucherId + " expired!");
            }

            if (!voucher.getSkus().containsAll(skus)) {
                throw new ForbiddenException("Voucher cannot be applied to these products");
            }
        }

        return true;
    }
}
