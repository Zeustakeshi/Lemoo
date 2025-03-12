/*
 *  NotificationResponse
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:15 AM
 * */


package com.lemoo.notification.dto.response;

import com.lemoo.notification.common.enums.NotificationLevel;
import com.lemoo.notification.common.enums.NotificationType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class NotificationResponse {
    private String notifyText;
    private NotificationType type;
    private NotificationLevel level;
    private LocalDateTime timestamp;
}
