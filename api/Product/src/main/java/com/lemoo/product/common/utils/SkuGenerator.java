/*
 *  SkuGenerator
 *  @author: Minhhieuano
 *  @created 1/5/2025 6:37 PM
 * */


package com.lemoo.product.common.utils;

import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.zip.CRC32;

public class SkuGenerator {

    public static final int MAX_SKU_LENGTH = 32;
    private static final String SKU_PREFIX = "LM_";

    public static String hashToBase62(String input) {
        CRC32 crc = new CRC32();
        crc.update(input.getBytes(StandardCharsets.UTF_8));
        long hashValue = crc.getValue();

        // Encode Base62
        String base62Chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        StringBuilder base62 = new StringBuilder();
        while (hashValue > 0) {
            base62.append(base62Chars.charAt((int) (hashValue % 62)));
            hashValue /= 62;
        }

        return base62.reverse().toString();
    }

    public static String generateSKU(String productId, List<String> variantValues) {
        StringBuilder skuBuilder = new StringBuilder();

        skuBuilder.append(SKU_PREFIX);

        for (String variant : variantValues) {
            String hashedVariant = hashToBase62(variant);
            skuBuilder.append(hashedVariant).append("_");
        }

        String hashedProductId = hashToBase62(productId);
        skuBuilder.append("p").append(hashedProductId);

        String sku = skuBuilder.toString();

        if (sku.length() > MAX_SKU_LENGTH) {
            sku = sku.substring(0, MAX_SKU_LENGTH);
        }

        return sku;
    }
}
