/*
 *  Notification
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:07 AM
 * */


package com.lemoo.notification.entity;

import com.lemoo.notification.common.enums.NotificationLevel;
import com.lemoo.notification.common.enums.NotificationScope;
import com.lemoo.notification.common.enums.NotificationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import org.springframework.data.mongodb.core.mapping.Document;

@EqualsAndHashCode(callSuper = true)
@Document
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Data
public class Notification extends BaseEntity {
    private String targetId;
    private String notifyText;
    private NotificationType type;
    private NotificationLevel level;
    private NotificationScope scope;
}
