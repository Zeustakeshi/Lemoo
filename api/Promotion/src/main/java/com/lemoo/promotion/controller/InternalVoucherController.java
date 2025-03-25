/*
 *  InternalVoucherController
 *  @author: pc
 *  @created 3/26/2025 12:18 AM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.dto.request.InternalValidateVoucherRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.InternalVoucherService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/internal/vouchers")
@RequiredArgsConstructor
public class InternalVoucherController {
    private final InternalVoucherService internalVoucherService;

    @PostMapping("/check")
    public ApiResponse<Boolean> applyVoucherCheck(
            @RequestBody @Valid InternalValidateVoucherRequest request
    ) {
        return ApiResponse.success(internalVoucherService.canApplyVoucher(request));
    }
}
