/*
 *  ShippingAddressHelper
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:10 AM
 * */


package com.lemoo.order_v2.helper;

public class ShippingAddressHelper {
    private ShippingAddressHelper() {
    }

    public static String getShippingAddressCacheKey(String addressId, String userId) {
        return "user:" + userId + ":address:" + addressId;
    }
}
