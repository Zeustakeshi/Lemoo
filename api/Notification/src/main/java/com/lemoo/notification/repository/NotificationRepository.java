/*
 *  NotificationRepository
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:14 AM
 * */

package com.lemoo.notification.repository;

import com.lemoo.notification.common.enums.NotificationScope;
import com.lemoo.notification.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends MongoRepository<Notification, String> {
    Page<Notification> findAllByTargetIdAndScope(String targetId, NotificationScope scope, Pageable pageable);
}
