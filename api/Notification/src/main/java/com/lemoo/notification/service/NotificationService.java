/*
 *  NotificationService
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:13 AM
 * */

package com.lemoo.notification.service;

import com.lemoo.notification.dto.common.AuthenticatedAccount;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.dto.response.PageableResponse;
import com.lemoo.notification.entity.Notification;

public interface NotificationService {
    PageableResponse<NotificationResponse> getAllNotification(int page, int limit, AuthenticatedAccount account);

    PageableResponse<NotificationResponse> getAllStoreNotification(int page, int limit, AuthenticatedAccount account);

    void saveNotification(Notification notification);
}

