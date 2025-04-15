export enum OrderStatus {
    /**
     * The order has been created but payment has not yet been completed.
     */
    UN_PAID = "UN_PAID",

    /**
     * The order has been placed and is awaiting confirmation from the seller.
     */
    PENDING = "PENDING",

    /**
     * The order has been cancelled by the buyer or seller before it is processed further.
     */
    CANCELLED = "CANCELLED",

    /**
     * The order has been confirmed by the seller and is ready for processing.
     */
    CONFIRMED = "CONFIRMED",

    /**
     * The order has been packed and ready to ship
     */
    PACKED = "PACKED",

    /**
     * The order has been handed over to the shipping provider for delivery.
     */
    SHIPPED = "SHIPPED",

    /**
     * The order is currently in transit, moving from the seller to the buyer.
     */
    IN_TRANSIT = "IN_TRANSIT",

    /**
     * The delivery attempt failed (e.g., buyer not available, incorrect address).
     */
    FAILED_DELIVERY = "FAILED_DELIVERY",

    /**
     * The order has been successfully delivered to the buyer.
     */
    DELIVERED = "DELIVERED",

    /**
     * The order process is fully completed, typically after delivery and no further actions are required.
     */
    COMPLETED = "COMPLETED",
}
