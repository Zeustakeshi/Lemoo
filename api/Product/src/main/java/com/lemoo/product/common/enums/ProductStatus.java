/*
 *  ProductStatus
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:30 PM
 * */

package com.lemoo.product.common.enums;


public enum ProductStatus {

    /**
     * The product is available and active in the system.
     */
    LIVE,

    /**
     * The product is inactive and not currently available.
     */
    INACTIVE,

    /**
     * The product has been removed or deleted from the system.
     */
    DELETED,

    /**
     * The product is awaiting review or approval.
     */
    PENDING,

    /**
     * The product has been rejected, likely due to failing evaluation criteria.
     */
    REJECTED,

    /**
     * The product is out of stock and cannot be purchased.
     */
    SOLD_OUT,

}
