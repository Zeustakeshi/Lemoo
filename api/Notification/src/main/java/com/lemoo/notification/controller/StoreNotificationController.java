/*
 *  StoreNotificationController
 *  @author: Minhhieuano
 *  @created 3/13/2025 1:33 AM
 * */


package com.lemoo.notification.controller;

import com.lemoo.notification.common.constants.CustomRequestHeader;
import com.lemoo.notification.dto.common.AuthenticatedAccount;
import com.lemoo.notification.dto.response.ApiResponse;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.dto.response.PageableResponse;
import com.lemoo.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController()
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreNotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<PageableResponse<NotificationResponse>> getAllNotification(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestHeader(CustomRequestHeader.STORE_ID) String storeId
    ) {
        return ApiResponse.success(notificationService.getAllStoreNotification(storeId, page, limit, account));
    }
}
