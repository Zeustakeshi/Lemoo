/*
 *  UserVoucherController
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:52 PM
 * */


package com.lemoo.promotion.controller;

import com.lemoo.promotion.dto.common.AuthenticatedAccount;
import com.lemoo.promotion.dto.response.ApiResponse;
import com.lemoo.promotion.service.UserVoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user/vouchers")
@RequiredArgsConstructor
public class UserVoucherController {
    private final UserVoucherService userVoucherService;

    @PostMapping("{voucherId}")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<?> collectVoucher(
            @PathVariable("voucherId") String voucherId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(userVoucherService.collectVoucher(account, voucherId));
    }
}
