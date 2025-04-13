/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:56 PM
 * */


package com.lemoo.shipping.mapper;

import com.lemoo.shipping.dto.response.SkuResponse;
import org.mapstruct.Mapper;

import java.util.HashMap;
import java.util.Map;

@Mapper
public abstract class SkuMapper {

    public Map<String, Object> toSkuMap(SkuResponse sku) {

        Map<String, Object> skuMap = new HashMap<>();

        skuMap.put("skuCode", sku.getSkuCode());
        skuMap.put("name", sku.getName());
        skuMap.put("productId", sku.getProductId());
        skuMap.put("storeId", sku.getStoreId());
        skuMap.put("price", sku.getPrice().toString());
        skuMap.put("stock", sku.getStock().toString());
        skuMap.put("image", sku.getImage());
        skuMap.put("packageWidth", sku.getPackageWidth());
        skuMap.put("packageHeight", sku.getPackageHeight());
        skuMap.put("packageLength", sku.getPackageLength());
        skuMap.put("packageWeight", sku.getPackageWeight());

        return skuMap;
    }

    public SkuResponse toSkuResponse(Map<String, Object> skuMap) {
        if (skuMap == null) {
            throw new IllegalArgumentException("The input map cannot be null.");
        }

        SkuResponse skuResponse = new SkuResponse();

        skuResponse.setSkuCode((String) skuMap.get("skuCode"));
        skuResponse.setName((String) skuMap.get("name"));
        skuResponse.setProductId((String) skuMap.get("productId"));
        skuResponse.setStoreId((String) skuMap.get("storeId"));

        // Safely convert price and stock from Object to appropriate types
        Object priceObj = skuMap.get("price");
        if (priceObj instanceof String) {
            try {
                skuResponse.setPrice(Long.parseLong(String.valueOf(priceObj)));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid format for price: " + priceObj);
            }
        }

        Object stockObj = skuMap.get("stock");
        if (stockObj instanceof String) {
            try {
                skuResponse.setStock(Long.parseLong((String) stockObj));
            } catch (NumberFormatException e) {
                throw new IllegalArgumentException("Invalid format for stock: " + stockObj);
            }
        }

        skuResponse.setImage((String) skuMap.get("image"));
        skuResponse.setPackageWidth((Double) skuMap.get("packageWidth"));
        skuResponse.setPackageHeight((Double) skuMap.get("packageHeight"));
        skuResponse.setPackageLength((Double) skuMap.get("packageLength"));
        skuResponse.setPackageWeight((Double) skuMap.get("packageWeight"));

        return skuResponse;
    }


}
