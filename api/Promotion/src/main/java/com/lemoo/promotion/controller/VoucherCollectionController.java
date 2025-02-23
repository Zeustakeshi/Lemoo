/*
 *  UserVoucherController
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:52 PM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.ApiResponse;
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

    @PostMapping("/{voucherId}/collect")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> collectVoucher(
            @PathVariable("voucherId") String voucherId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(voucherCollectionService.collectVoucher(account, voucherId));
    }
}
