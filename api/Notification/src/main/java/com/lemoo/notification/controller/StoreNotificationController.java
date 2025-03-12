/*
 *  StoreNotificationController
 *  @author: Minhhieuano
 *  @created 3/13/2025 1:33 AM
 * */


package com.lemoo.notification.controller;

import com.lemoo.notification.dto.common.AuthenticatedAccount;
import com.lemoo.notification.dto.response.ApiResponse;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.dto.response.PageableResponse;
import com.lemoo.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController()
@RequestMapping("/store")
@RequiredArgsConstructor
public class StoreNotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<PageableResponse<NotificationResponse>> getAllNotification(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(notificationService.getAllStoreNotification(page, limit, account));
    }
}
