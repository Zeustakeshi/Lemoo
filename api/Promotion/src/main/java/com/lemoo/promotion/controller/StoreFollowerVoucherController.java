/*
 *  StoreFollowerVoucherController
 *  @author: Minhhieuano
 *  @created 2/20/2025 4:58 PM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.common.constants.CustomRequestHeader;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.StoreFollowerVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.dto.response.StoreFollowerVoucherResponse;
import com.lemoo.promotion.service.StoreFollowerVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vouchers/store-follower")
@RequiredArgsConstructor
public class StoreFollowerVoucherController {
    private final StoreFollowerVoucherService storeFollowerVoucherService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<String> createStoreFollowerVoucher(
            @RequestBody @Valid StoreFollowerVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(storeFollowerVoucherService.createVoucher(request, storeId, account));
    }

    @GetMapping("/{voucherId}")
    public ApiResponse<StoreFollowerVoucherResponse> getStoreFollowerVoucherById(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(storeFollowerVoucherService.findVoucherById(voucherId, storeId, account));
    }

    @PatchMapping("/{voucherId}/activate")
    public ApiResponse<Boolean> activateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        storeFollowerVoucherService.activateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }

    @PatchMapping("/{voucherId}/deactivate")
    public ApiResponse<Boolean> deactivateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        storeFollowerVoucherService.deactivateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }
}
