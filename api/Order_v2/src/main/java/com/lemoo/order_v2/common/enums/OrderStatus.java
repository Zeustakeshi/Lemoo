/*
 *  OrderStatus
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:25 AM
 * */


package com.lemoo.order_v2.common.enums;

public enum OrderStatus {

    /**
     * The order has not been confirmed yet.
     */
    PENDING,

    /**
     * The order was canceled by the buyer.
     */
    CANCELLED,

    /**
     * The seller has confirmed the availability of the items.
     */
    CONFIRMED,

    /**
     * The order was rejected by the seller (e.g., due to unavailability of stock).
     */
    REJECTED,

    /**
     * The order has been handed over to the shipping company.
     */
    SHIPPED,

    /**
     * The order is currently in transit.
     */
    SHIPPING,

    /**
     * The order has been successfully delivered to the buyer.
     */
    DELIVERED
}