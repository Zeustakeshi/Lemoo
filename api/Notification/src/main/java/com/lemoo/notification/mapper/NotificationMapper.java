/*
 *  NotificationMapper
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:17 AM
 * */


package com.lemoo.notification.mapper;

import com.lemoo.notification.common.enums.NotificationLevel;
import com.lemoo.notification.common.enums.NotificationScope;
import com.lemoo.notification.common.enums.NotificationType;
import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.entity.Notification;
import com.lemoo.notification.event.model.ProductEvaluationNotificationEvent;
import com.lemoo.notification.event.model.RealtimeNotificationEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface NotificationMapper {
    @Mapping(source = "createdAt", target = "timestamp")
    NotificationResponse toNotificationResponse(Notification notification);

    RealtimeNotificationEvent toRealtimeNotificationEvent(Notification notification);

    default Notification toNotification(ProductEvaluationNotificationEvent event) {
        NotificationLevel level = event.isSuccess() ? NotificationLevel.SUCCESS : NotificationLevel.ERROR;

        return Notification.builder()
                .level(level)
                .notifyText(event.getNote())
                .targetId(event.getStoreId())
                .type(NotificationType.PRODUCT)
                .scope(NotificationScope.STORE)
                .build();
    }


}
