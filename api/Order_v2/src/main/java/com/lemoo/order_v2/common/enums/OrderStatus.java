/*
 *  OrderStatus
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:25 AM
 * */


package com.lemoo.order_v2.common.enums;

public enum OrderStatus {

    /**
     * The order has been newly created (Unpaid or Unconfirmed).
     */
    PENDING,

    /**
     * The order has been confirmed by the seller (or the system).
     */
    CONFIRMED,

    /**
     * The order is being processed (Preparing items).
     */
    PROCESSING,

    /**
     * The items are ready for shipment.
     */
    READY_FOR_SHIPPING,

    /**
     * The order has been handed over to the shipping provider.
     */
    SHIPPED,

    /**
     * The order is in transit to the customer.
     */
    IN_TRANSIT,

    /**
     * The order has been successfully delivered.
     */
    DELIVERED,

    /**
     * The order was canceled by the buyer or the seller.
     */
    CANCELLED,

    /**
     * The order was returned (Return).
     */
    RETURNED,

    /**
     * The order was refunded (Refund).
     */
    REFUNDED,

    /**
     * The order was rejected by the seller (e.g., out of stock).
     */
    REJECTED,

    /**
     * The order is awaiting payment (In case of post-payment).
     */
    AWAITING_PAYMENT,

    /**
     * The order payment was successfully completed.
     */
    PAYMENT_COMPLETED,

    /**
     * The order payment failed.
     */
    PAYMENT_FAILED,

    /**
     * The order is awaiting confirmation by the seller.
     */
    AWAITING_CONFIRMATION
}