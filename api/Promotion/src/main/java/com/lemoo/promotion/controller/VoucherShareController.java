/*
 *  VoucherShareController
 *  @author: pc
 *  @created 4/21/2025 10:02 AM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.ShareVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.ShareVoucherService;
import com.lemoo.promotion.service.VoucherCollectionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("vouchers/share")
@RequiredArgsConstructor
public class VoucherShareController {
    private final ShareVoucherService shareVoucherService;
    private final VoucherCollectionService voucherCollectionService;

    @PostMapping
    public ApiResponse<?> shareVoucher(
            @RequestBody @Valid ShareVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shareVoucherService.shareVoucher(request, account));
    }

    @PostMapping("/{transactionId}/collect")
    public ApiResponse<?> collectSharedVoucher(
            @PathVariable("transactionId") String transactionId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(shareVoucherService.collectSharedVoucher(transactionId, account));
    }

}
