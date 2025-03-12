/*
 *  NotificationController
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:18 AM
 * */


package com.lemoo.notification.controller;

import com.lemoo.notification.dto.common.AuthenticatedAccount;
import com.lemoo.notification.dto.response.ApiResponse;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.dto.response.PageableResponse;
import com.lemoo.notification.entity.Notification;
import com.lemoo.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;

    @GetMapping
    public ApiResponse<PageableResponse<NotificationResponse>> getAllNotification(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "20") int limit,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(notificationService.getAllNotification(page, limit, account));
    }

    @PostMapping("/init")
    public ApiResponse<?> saveNotification(
            @RequestBody Notification notification,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        notificationService.createNotification(notification);
        return ApiResponse.success(true);
    }
}
