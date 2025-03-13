/*
 *  SendRealtimeNotificationEvent
 *  @author: Minhhieuano
 *  @created 3/13/2025 11:01 AM
 * */


package com.lemoo.notification.event.model;

import com.lemoo.notification.common.enums.NotificationLevel;
import com.lemoo.notification.common.enums.NotificationScope;
import com.lemoo.notification.common.enums.NotificationType;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RealtimeNotificationEvent extends Event {
    private String targetId;
    private String notifyText;
    private NotificationType type;
    private NotificationLevel level;
    private NotificationScope scope;
}
