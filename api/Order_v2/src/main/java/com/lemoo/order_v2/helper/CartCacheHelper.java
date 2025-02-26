/*
 *  CartItemCaheHelper
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:04 AM
 * */


package com.lemoo.order_v2.helper;

public class CartCacheHelper {
    private CartCacheHelper() {
    }

    public static String getCartCacheKey(String userId) {
        return "cart:" + userId;
    }

    public static String getCartItemCacheKey(String cartItemId) {
        return "cartItem:" + cartItemId;
    }
}
