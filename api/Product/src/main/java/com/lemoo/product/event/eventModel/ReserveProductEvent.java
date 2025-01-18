/*
 *  OrderCreatedEvent
 *  @author: Minhhieuano
 *  @created 1/16/2025 1:52 AM
 * */


package com.lemoo.product.event.eventModel;

import com.lemoo.product.domain.OrderSku;
import lombok.*;

import java.util.Map;

@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ReserveProductEvent extends Event {
    private String orderId;
    private Map<String, OrderSku> skus;
}
