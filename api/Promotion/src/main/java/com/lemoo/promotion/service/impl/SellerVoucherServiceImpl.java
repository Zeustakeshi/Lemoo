/*
 *  SellerVoucherServiceImpl
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:48 PM
 * */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.client.StoreClient;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.SellerVoucherRequest;
import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.exception.ForbiddenException;
import com.lemoo.promotion.mapper.VoucherMapper;
import com.lemoo.promotion.repository.SellerVoucherRepository;
import com.lemoo.promotion.service.SellerVoucherService;
import com.lemoo.promotion.service.SellerVoucherValidationService;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SellerVoucherServiceImpl implements SellerVoucherService {

    private final SellerVoucherRepository sellerVoucherRepository;
    private final VoucherMapper voucherMapper;
    private final StoreClient storeClient;
    private final SellerVoucherValidationService voucherValidationService;

    @Override
    @CircuitBreaker(name = "store-service", fallbackMethod = "createRegularVoucherFallback")
    public String createVoucher(String storeId, AuthenticatedAccount account, SellerVoucherRequest request) {
        verifyStore(account.getId(), storeId);
        return "oke";
    }

    @CircuitBreaker(name = "store-service", fallbackMethod = "createStoreFollowerVoucherFallback")
    private void verifyStore(String accountId, String storeId) {
        if (storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId)).getData()) return;
        throw new ForbiddenException("Can't access this store");
    }

    private String createRegularVoucherFallback(
            String storeId, AuthenticatedAccount account, SellerVoucherRequest request, Throwable throwable) {
        return "Store service is unavailable. Please try again later!";
    }

}
