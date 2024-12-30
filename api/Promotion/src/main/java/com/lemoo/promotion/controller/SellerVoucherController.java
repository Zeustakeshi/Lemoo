/*
 *  VoucherController
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:42 PM
 * */

package com.lemoo.promotion.controller;

import com.lemoo.promotion.common.constants.CustomRequestHeader;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.SellerVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.SellerVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/vouchers")
@RequiredArgsConstructor
public class SellerVoucherController {
    private final SellerVoucherService sellerVoucherService;

    @PostMapping()
    public ApiResponse<?> createVoucher(
            @RequestBody @Valid SellerVoucherRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId) {
        return ApiResponse.success(sellerVoucherService.createVoucher(storeId, account, request));
    }
}
