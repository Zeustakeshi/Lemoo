/*
 *  VoucherProductServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:14 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.UpdateVoucherProductRequest;
import com.lemoo.promotion.entity.SellerVoucher;
import com.lemoo.promotion.exception.BadRequestException;
import com.lemoo.promotion.exception.NotfoundException;
import com.lemoo.promotion.repository.SellerVoucherRepository;
import com.lemoo.promotion.service.StoreService;
import com.lemoo.promotion.service.VoucherCacheService;
import com.lemoo.promotion.service.VoucherProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;


@Service
@RequiredArgsConstructor
public class VoucherProductServiceImpl implements VoucherProductService {

    private final SellerVoucherRepository sellerVoucherRepository;
    private final StoreService storeService;
    private final VoucherCacheService voucherCacheService;

    @Override
    public Set<String> updateVoucherProduct(String storeId, AuthenticatedAccount account, String voucherId, UpdateVoucherProductRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        SellerVoucher voucher = sellerVoucherRepository.findByIdAndStoreIdAndVoucherType(voucherId, storeId, request.getVoucherType())
                .orElseThrow(() -> new NotfoundException("Voucher " + voucherId + " not found"));

        if (voucher.getVoucherType().equals(VoucherType.STORE_FOLLOWER_VOUCHER)) {
            throw new BadRequestException("Voucher type not support apply product");
        }

        // TODO: verify the product belongs to the store.

        if (voucher.getSkus() == null) voucher.setSkus(request.getSkus());
        else voucher.getSkus().addAll(request.getSkus());

        sellerVoucherRepository.save(voucher);

        voucherCacheService.addProductVoucherAsyncBulkAsync(request.getSkus(), voucherId);

        return voucher.getSkus();
    }

}
