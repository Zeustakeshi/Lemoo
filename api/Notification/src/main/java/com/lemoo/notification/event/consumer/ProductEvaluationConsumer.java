/*
 *  ProductEvaluationConsumer
 *  @author: Minhhieuano
 *  @created 3/13/2025 10:58 AM
 * */


package com.lemoo.notification.event.consumer;

import com.lemoo.notification.entity.Notification;
import com.lemoo.notification.event.model.ProductEvaluationNotificationEvent;
import com.lemoo.notification.event.producer.SocketProducer;
import com.lemoo.notification.mapper.NotificationMapper;
import com.lemoo.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductEvaluationConsumer {

    private final SocketProducer socketProducer;
    private final NotificationService notificationService;
    private final NotificationMapper notificationMapper;

    @KafkaListener(topics = "product-service.evaluation-product.notify", groupId = "${spring.kafka.consumer.group-id}")
    public void productEvaluationSuccessEventListener(ProductEvaluationNotificationEvent event) {
        Notification notification = notificationMapper.toNotification(event);
        notificationService.saveNotification(notification);
        socketProducer.sendRealtimeNotification(
                notificationMapper.toRealtimeNotificationEvent(notification)
        );
    }
}
