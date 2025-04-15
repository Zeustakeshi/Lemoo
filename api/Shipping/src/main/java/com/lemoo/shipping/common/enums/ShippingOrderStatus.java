/*
 *  ShippingOrderStatus
 *  @author: pc
 *  @created 4/15/2025 8:47 AM
 * */

package com.lemoo.shipping.common.enums;

import lombok.Getter;

@Getter
public enum ShippingOrderStatus {
    READY_TO_PICK("ready_to_pick", "Order newly created"),
    PICKING("picking", "Staff picking up the order"),
    CANCEL("cancel", "Order canceled"),
    MONEY_COLLECT_PICKING("money_collect_picking", "Collecting money from sender"),
    PICKED("picked", "Staff has picked up the order"),
    STORING("storing", "Order in storage"),
    TRANSPORTING("transporting", "Order in transit"),
    SORTING("sorting", "Order being sorted"),
    DELIVERING("delivering", "Staff delivering to recipient"),
    MONEY_COLLECT_DELIVERING("money_collect_delivering", "Collecting money from recipient"),
    DELIVERED("delivered", "Order successfully delivered"),
    DELIVERY_FAIL("delivery_fail", "Delivery failed"),
    WAITING_TO_RETURN("waiting_to_return", "Waiting to return order to sender"),
    RETURN("return", "Order return"),
    RETURN_TRANSPORTING("return_transporting", "Return order in transit"),
    RETURN_SORTING("return_sorting", "Return order being sorted"),
    RETURNING("returning", "Staff returning the order"),
    RETURN_FAIL("return_fail", "Return delivery failed"),
    RETURNED("returned", "Order successfully returned"),
    EXCEPTION("exception", "Order exception, not in standard process"),
    DAMAGE("damage", "Order damaged"),
    LOST("lost", "Order lost");

    private final String apiValue;
    private final String description;

    ShippingOrderStatus(String apiValue, String description) {
        this.apiValue = apiValue;
        this.description = description;
    }

    public static ShippingOrderStatus fromApiValue(String apiValue) {
        for (ShippingOrderStatus status : ShippingOrderStatus.values()) {
            if (status.getApiValue().equalsIgnoreCase(apiValue)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Status not found: " + apiValue);
    }

}
