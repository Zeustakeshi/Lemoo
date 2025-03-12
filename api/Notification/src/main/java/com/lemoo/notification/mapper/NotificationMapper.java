/*
 *  NotificationMapper
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:17 AM
 * */


package com.lemoo.notification.mapper;

import com.lemoo.notification.dto.response.NotificationResponse;
import com.lemoo.notification.entity.Notification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface NotificationMapper {
    @Mapping(source = "createdAt", target = "timestamp")
    NotificationResponse toNotificationResponse(Notification notification);
}
