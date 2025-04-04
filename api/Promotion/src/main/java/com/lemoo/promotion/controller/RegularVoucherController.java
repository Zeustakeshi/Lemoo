/*
 *  RegularVoucherController
 *  @author: Minhhieuano
 *  @created 2/20/2025 4:23 PM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.common.constants.CustomRequestHeader;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.AddVoucherSkuRequest;
import com.lemoo.promotion.dto.request.RegularVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.dto.response.PageableResponse;
import com.lemoo.promotion.dto.response.RegularVoucherResponse;
import com.lemoo.promotion.service.RegularVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller/vouchers/regular")
@RequiredArgsConstructor
public class RegularVoucherController {
    private final RegularVoucherService regularVoucherService;

    @PostMapping()
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<String> createRegularVoucher(
            @RequestBody @Valid RegularVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(regularVoucherService.createVoucher(request, storeId, account));
    }

    @GetMapping
    public ApiResponse<PageableResponse<RegularVoucherResponse>> getAllRegularVoucher(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(regularVoucherService.findAllByStoreId(storeId, page, limit, account));
    }

    @GetMapping("/{voucherId}")
    public ApiResponse<RegularVoucherResponse> getRegularVoucherById(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(regularVoucherService.findVoucherById(voucherId, storeId, account));
    }

    @PatchMapping("/{voucherId}/activate")
    public ApiResponse<Boolean> activateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        regularVoucherService.activateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }

    @PatchMapping("/{voucherId}/deactivate")
    public ApiResponse<Boolean> deactivateVoucher(
            @PathVariable("voucherId") String voucherId,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        regularVoucherService.deactivateVoucher(storeId, account, voucherId);
        return ApiResponse.success(true);
    }

    @PostMapping("/{voucherId}/skus")
    public ApiResponse<Boolean> addSkuToVoucher(
            @RequestBody @Valid AddVoucherSkuRequest request,
            @PathVariable("voucherId") String voucherId,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        regularVoucherService.addSkuToVoucher(voucherId, request.getSkus(), storeId, account);
        return ApiResponse.success(true);
    }
}
