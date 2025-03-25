/*
 *  VoucherProductController
 *  @author: Minhhieuano
 *  @created 1/2/2025 12:15 AM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.common.constants.CustomRequestHeader;
import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.request.UpdateVoucherProductRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.VoucherProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/seller/vouchers/{voucherId}/products")
@RequiredArgsConstructor
public class VoucherProductController {
    private final VoucherProductService voucherProductService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> updateVoucherProduct(
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId,
            @PathVariable("voucherId") String voucherId,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestBody @Valid UpdateVoucherProductRequest request
    ) {
        return ApiResponse.success(voucherProductService.updateVoucherProduct(storeId, account, voucherId, request));
    }
}
