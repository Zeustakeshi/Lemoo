/*
 *  OrderSkuPayload
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:01 AM
 * */


package com.lemoo.order.event.eventModel;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RemoveCartItemEvent {
    private String orderId;
    private String cartItemId;
}
