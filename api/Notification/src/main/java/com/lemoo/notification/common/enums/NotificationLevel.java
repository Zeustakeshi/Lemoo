/*
 *  NotifyLevel
 *  @author: Minhhieuano
 *  @created 3/13/2025 12:09 AM
 * */


package com.lemoo.notification.common.enums;

/**
 * Enum representing different levels of notifications.
 * Used to classify and handle notifications based on their priority and severity.
 */
public enum NotificationLevel {
    /**
     * Informational notification.
     * Provides general information or updates to the user.
     */
    INFO,

    /**
     * Success notification.
     * Indicates that an operation or process was completed successfully.
     */
    SUCCESS,

    /**
     * Warning notification.
     * Alerts the user to potential issues or actions that may require attention.
     */
    WARNING,

    /**
     * Error notification.
     * Indicates that an error has occurred and may require intervention.
     */
    ERROR,

    /**
     * Critical notification.
     * Represents a serious issue or system failure that demands immediate attention.
     */
    CRITICAL
}