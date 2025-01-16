/*
 *  OrderStatus
 *  @author: Minhhieuano
 *  @created 1/16/2025 2:32 AM
 * */


package com.lemoo.order.common.enums;

public enum OrderStatus {
    PROCESSING,
    PROCESSING_FAILED,
    WAITING_FOR_CONFIRMATION,
    DISPATCHED,
    SHIPPING,
    DELIVERED_SUCCESSFULLY,
    REVIEWED
}
