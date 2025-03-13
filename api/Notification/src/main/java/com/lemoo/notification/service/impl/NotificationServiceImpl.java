/*
 *  NotificationServiceImpl
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:14 AM
 * */


package com.lemoo.notification.service.impl;

import com.lemoo.notification.common.enums.NotificationScope;
import com.lemoo.notification.dto.common.AuthenticatedAccount;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.dto.response.PageableResponse;
import com.lemoo.notification.entity.Notification;
import com.lemoo.notification.mapper.NotificationMapper;
import com.lemoo.notification.mapper.PageMapper;
import com.lemoo.notification.repository.NotificationRepository;
import com.lemoo.notification.service.NotificationService;
import com.lemoo.notification.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {
    private final NotificationRepository notificationRepository;
    private final NotificationMapper notificationMapper;
    private final PageMapper pageMapper;
    private final StoreService storeService;

    @Override
    public void saveNotification(Notification notification) {
        notificationRepository.save(notification);
    }

    @Override
    public PageableResponse<NotificationResponse> getAllNotification(int page, int limit, AuthenticatedAccount account) {
        var notifications = getAllNotificationByScope(page, limit, NotificationScope.USER, account.getUserId());
        Page<NotificationResponse> notificationResponses = notifications.map(notificationMapper::toNotificationResponse);
        return pageMapper.toPageableResponse(notificationResponses);
    }

    @Override
    public PageableResponse<NotificationResponse> getAllStoreNotification(String storeId, int page, int limit, AuthenticatedAccount account) {
        storeService.verifyStore(account.getUserId(), storeId);
        var notifications = getAllNotificationByScope(page, limit, NotificationScope.STORE, storeId);
        Page<NotificationResponse> notificationResponses = notifications.map(notificationMapper::toNotificationResponse);
        return pageMapper.toPageableResponse(notificationResponses);
    }

    private Page<Notification> getAllNotificationByScope(int page, int limit, NotificationScope scope, String targetId) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        return notificationRepository.findAllByTargetIdAndScope(targetId, scope, pageRequest);
    }

}
