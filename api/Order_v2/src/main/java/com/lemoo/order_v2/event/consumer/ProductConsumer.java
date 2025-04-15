/*
 *  ProductConsumer
 *  @author: pc
 *  @created 4/8/2025 2:06 PM
 * */


package com.lemoo.order_v2.event.consumer;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.entity.Order;
import com.lemoo.order_v2.entity.OrderItem;
import com.lemoo.order_v2.event.model.CompensateVoucherEvent;
import com.lemoo.order_v2.event.model.NotifyOrderStatusEvent;
import com.lemoo.order_v2.event.model.ProductReserveResultEvent;
import com.lemoo.order_v2.event.producer.NotificationProducer;
import com.lemoo.order_v2.event.producer.PromotionProducer;
import com.lemoo.order_v2.service.CartItemService;
import com.lemoo.order_v2.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Set;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ProductConsumer {

    private final PromotionProducer promotionProducer;
    private final NotificationProducer notificationProducer;
    private final OrderService orderService;
    private final CartItemService cartItemService;

    @KafkaListener(topics = "product-service.product.reserved", groupId = "${spring.kafka.consumer.group-id}")
    public void reserveProductSuccess(ProductReserveResultEvent event) {
        Order order = orderService.findByIdAndUserId(event.getOrderId(), event.getUserId());

        Set<String> skuCodes = order.getItems()
                .stream()
                .map(OrderItem::getSkuCode)
                .collect(Collectors.toSet()
                );

        cartItemService.removeCartItemBySkuCodes(event.getUserId(), skuCodes);

        System.out.println("Completed Order create flow");
    }


    @KafkaListener(topics = "product-service.product.reserve-failed", groupId = "${spring.kafka.consumer.group-id}")
    public void reserveProductFailed(ProductReserveResultEvent event) {
        Order order = orderService.findByIdAndUserId(event.getOrderId(), event.getUserId());

        orderService.updateOrderStatus(event.getUserId(), event.getOrderId(), OrderStatus.CANCELLED);

        promotionProducer.compensateVoucher(CompensateVoucherEvent.builder()
                .orderId(event.getOrderId())
                .vouchers(order.getVouchers())
                .userId(order.getUserId())
                .build());

        notificationProducer.notifyOrderStatus(NotifyOrderStatusEvent.builder()
                .message(event.getMessage())
                .orderId(event.getOrderId())
                .userId(order.getUserId())
                .build());
    }

}
