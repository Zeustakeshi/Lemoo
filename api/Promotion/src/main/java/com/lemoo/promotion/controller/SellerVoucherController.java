/*
 *  VoucherController
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:42 PM
 * */

package com.lemoo.promotion.controller;

import com.lemoo.promotion.common.constants.CustomRequestHeader;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.FirstPurchaseVoucherRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.SellerVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
public class SellerVoucherController {
    private final SellerVoucherService sellerVoucherService;

    @PostMapping("/regular")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createRegularVoucher(
            @RequestBody @Valid RegularVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(sellerVoucherService.createRegularVoucher(storeId, account, request));
    }

    @PostMapping("/store-follower")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createStoreFollowerVoucher(
            @RequestBody @Valid StoreFollowerVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(sellerVoucherService.createStoreFollowerVoucher(storeId, account, request));
    }

    @PostMapping("/first-purchase")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> createFirstPurchaseVoucher(
            @RequestBody @Valid FirstPurchaseVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(sellerVoucherService.createFirstPurchaseVoucher(storeId, account, request));
    }

    @PostMapping("{voucherId}/activate")
    public ApiResponse<?> activateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        sellerVoucherService.activateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }

    @DeleteMapping("{voucherId}/deactivate")
    public ApiResponse<?> deactivateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        sellerVoucherService.deactivateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }
}
