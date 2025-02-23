/*
 *  CollectedVoucherStatus
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:32 PM
 * */

package com.lemoo.promotion.common.enums;

/**
 * Enum representing the various statuses of a user's voucher in the application.
 */
public enum CollectedVoucherStatus {

    /**
     * The voucher is active and can be used.
     */
    ACTIVE,

    /**
     * The voucher has expired and can no longer be used.
     */
    EXPIRED,

    /**
     * The voucher has been collected but is not yet available for use.
     */
    NOT_STARTED,

    /**
     * The voucher has been revoked and cannot be used due to special reasons.
     */
    REVOKED
}
