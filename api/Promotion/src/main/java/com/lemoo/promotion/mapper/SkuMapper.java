/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:56 PM
 * */


package com.lemoo.promotion.mapper;

import com.lemoo.promotion.dto.response.SkuResponse;
import org.mapstruct.Mapper;

import java.util.Map;

@Mapper
public abstract class SkuMapper {

    public Map<String, String> toSkuMap(SkuResponse sku) {
        return Map.of(
                "skuCode", sku.getSkuCode(),
                "name", sku.getName(),
                "productId", sku.getProductId(),
                "storeId", sku.getStoreId(),
                "price", sku.getPrice().toString(),
                "stock", sku.getStock().toString(),
                "image", sku.getImage()
        );
    }

    public SkuResponse toSkuResponse(Map<String, String> skuMap) {
        if (skuMap == null) {
            throw new IllegalArgumentException("The input map cannot be null.");
        }

        SkuResponse skuResponse = new SkuResponse();
        skuResponse.setSkuCode(skuMap.get("skuCode"));
        skuResponse.setName(skuMap.get("name"));
        skuResponse.setProductId(skuMap.get("productId"));
        skuResponse.setStoreId(skuMap.get("storeId"));

        String price = skuMap.get("price");
        if (price != null) {
            skuResponse.setPrice(Long.parseLong(price));
        }

        String stock = skuMap.get("stock");
        if (stock != null) {
            skuResponse.setStock(Long.parseLong(stock));
        }

        skuResponse.setImage(skuMap.get("image"));

        return skuResponse;
    }

}
