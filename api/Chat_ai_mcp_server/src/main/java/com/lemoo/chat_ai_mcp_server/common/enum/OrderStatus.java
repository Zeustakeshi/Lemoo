/*
 *  OrderStatus
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:25 AM
 * */


package com.lemoo.chat_ai_mcp_server.common;

/**
 * Represents the possible statuses of an order in an e-commerce system.
 * This enum defines the lifecycle of an order from creation to completion or cancellation.
 */
public enum OrderStatus {

    /**
     * The order has been created but payment has not yet been completed.
     */
    UN_PAID,

    /**
     * The order has been placed and is awaiting confirmation from the seller.
     */
    PENDING,

    /**
     * The order has been cancelled by the buyer or seller before it is processed further.
     */
    CANCELLED,

    /**
     * The order has been confirmed by the seller and is ready for processing.
     */
    CONFIRMED,

    /**
     * The order has been packed and ready to ship
     */
    PACKED,

    /**
     * The order has been handed over to the shipping provider for delivery.
     */
    SHIPPED,

    /**
     * The order is currently in transit, moving from the seller to the buyer.
     */
    IN_TRANSIT,

    /**
     * The delivery attempt failed (e.g., buyer not available, incorrect address).
     */
    FAILED_DELIVERY,

    /**
     * The order has been successfully delivered to the buyer.
     */
    DELIVERED,

    /**
     * The order process is fully completed, typically after delivery and no further actions are required.
     */
    COMPLETED
}