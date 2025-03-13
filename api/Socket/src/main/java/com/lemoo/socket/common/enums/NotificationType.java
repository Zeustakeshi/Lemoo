/*
 *  NotifyType
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:11 AM
 * */


package com.lemoo.socket.common.enums;

/**
 * Enum representing different types of notifications.
 * Used to categorize notifications based on their purpose and content.
 */
public enum NotificationType {
    /**
     * System notification.
     * Represents notifications related to system updates or alerts.
     */
    SYSTEM,

    /**
     * Order notification.
     * Indicates notifications related to user orders, such as status updates.
     */
    ORDER,

    /**
     * Product notification.
     * Covers notifications regarding products, including availability or updates.
     */
    PRODUCT,

    /**
     * Promotion notification.
     * Refers to notifications about discounts, sales, or promotional events.
     */
    PROMOTION,

    /**
     * User notification.
     * Relates to updates or actions concerning user accounts or profiles.
     */
    USER,

    /**
     * Payment notification.
     * Includes notifications about payment status or issues.
     */
    PAYMENT,

    /**
     * Delivery notification.
     * Involves notifications related to shipping or delivery status.
     */
    DELIVERY,

    /**
     * Feedback notification.
     * Represents notifications regarding user reviews or feedback.
     */
    FEEDBACK
}