/*
 *  SellerVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.client.StoreClient;
import com.lemoo.promotion.common.enums.VoucherScope;
import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.SellerVoucherRepository;
import com.lemoo.promotion.service.SellerVoucherService;
import com.lemoo.promotion.service.SellerVoucherValidationService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class SellerVoucherServiceImpl implements SellerVoucherService {

    private final SellerVoucherRepository sellerVoucherRepository;
    private final VoucherMapper voucherMapper;
    private final StoreClient storeClient;
    private final SellerVoucherValidationService voucherValidationService;


    @Override
    @CircuitBreaker(name = "store-service")
    public String createRegularVoucher(String storeId, AuthenticatedAccount account, RegularVoucherRequest request) {
        verifyStore(account.getId(), storeId);

        voucherValidationService.validateRegularVoucher(request);

        var voucher = voucherMapper.toRegularVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setVoucherType(VoucherType.REGULAR_VOUCHER);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

    @Override
    @CircuitBreaker(name = "store-service")
    public String createStoreFollowerVoucher(String storeId, AuthenticatedAccount account, StoreFollowerVoucherRequest request) {
        verifyStore(account.getId(), storeId);

        voucherValidationService.validateStoreFollowerVoucher(request);

        var voucher = voucherMapper.toStoreFollowerVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setVoucherType(VoucherType.STORE_FOLLOWER_VOUCHER);
        voucher.setScope(VoucherScope.ENTIRE_STORE);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

    @Override
    public String createFirstPurchaseVoucher(String storeId, AuthenticatedAccount account, FirstPurchaseVoucherRequest request) {
        verifyStore(account.getId(), storeId);

        voucherValidationService.validateFirstPurchaseVoucher(request);

        var voucher = voucherMapper.toFirstPurchaseVoucher(request);
        voucher.setStoreId(storeId);
        voucher.setLimit(1L);
        voucher.setVoucherType(VoucherType.FIRST_PURCHASE);

        var newVoucher = sellerVoucherRepository.save(voucher);
        return newVoucher.getId();
    }

    private void verifyStore(String accountId, String storeId) {
        if (storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData()) return;
        throw new ForbiddenException("Can't access this store");
    }

}
