/*
 *  ProductCacheHelper
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:54 PM
 * */


package com.lemoo.promotion.helper;

public class SkuCacheHelper {
    private SkuCacheHelper() {
    }

    public static String getSkuCacheKey(String skuCode) {
        return "sku:" + skuCode;
    }

}
