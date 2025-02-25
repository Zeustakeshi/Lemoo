/*
 *  UserVoucherController
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:52 PM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.dto.response.CollectedVoucherResponse;
import com.lemoo.promotion.dto.response.PageableResponse;
import com.lemoo.promotion.service.VoucherCollectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vouchers")
@RequiredArgsConstructor
public class VoucherCollectionController {
    private final VoucherCollectionService voucherCollectionService;

    @GetMapping("collected")
    public ApiResponse<PageableResponse<CollectedVoucherResponse>> getAllCollectedVoucher(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(voucherCollectionService.getAllCollectedVoucher(account, page, limit));
    }

    @PostMapping("/{voucherId}/collect")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<CollectedVoucherResponse> collectVoucher(
            @PathVariable("voucherId") String voucherId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(voucherCollectionService.collectVoucher(account, voucherId));
    }
}
