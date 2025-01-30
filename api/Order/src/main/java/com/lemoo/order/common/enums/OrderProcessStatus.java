/*
 *  OrderStatus
 *  @author: Minhhieuano
 *  @created 1/16/2025 12:01 AM
 * */


package com.lemoo.order.common.enums;

/**
 * Enum representing the various stages and statuses of an order in the order processing system.
 */
public enum OrderProcessStatus {
    /**
     * The order is awaiting a promotion check to verify any applicable discounts or offers.
     */
    PENDING_PROMOTION_CHECK,

    /**
     * The order is awaiting product reservation to ensure the items are available and reserved for the customer.
     */
    PENDING_PRODUCT_RESERVATION,

    /**
     * The promotion check failed, and the order cannot proceed with the applied promotion.
     */
    FAILED_PROMOTION,

    /**
     * The order has been successfully processed and completed.
     */
    COMPLETED,

    /**
     * The product reservation failed, and the order cannot proceed due to unavailability of the items.
     */
    FAILED_PRODUCT_RESERVATION,

    /**
     * The system is in the process of reversing the applied promotion due to a failure or cancellation.
     */
    REVERSING_PROMOTION,

    /**
     * The applied promotion has been successfully reversed.
     */
    PROMOTION_REVERSED,

    /**
     * The attempt to reverse the promotion failed.
     */
    FAILED_PROMOTION_REVERT,

    /**
     * The system is in the process of reversing the product reservation due to a failure or cancellation.
     */
    REVERSING_PRODUCT_RESERVATION,

    /**
     * The product reservation has been successfully reversed.
     */
    PRODUCT_RESERVATION_REVERSED,

    /**
     * The attempt to reverse the product reservation failed.
     */
    FAILED_PRODUCT_REVERT
}

