/*
 *  ProductCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 3:47 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.dto.common.ProductHashCache;
import com.lemoo.product.service.ProductCacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;


@Slf4j
@Service
@RequiredArgsConstructor
public class ProductCacheServiceImpl implements ProductCacheService {
    private final RedissonClient redisson;

    @Async
    @Override
    public void saveProductAsync(ProductHashCache product) {
        try {
            String key = generateProductHashCacheKey(product.getId());
            Map<String, String> productMap = Map.of(
                    "id", product.getId(),
                    "name", product.getName(),
                    "thumbnail", product.getThumbnail(),
                    "rating", String.valueOf(product.getRating()),
                    "storeId", product.getStoreId(),
                    "status", product.getStatus().toString()
            );
            var productCache = redisson.getMap(key);
            productCache.putAllAsync(productMap);
            productCache.expireAsync(Duration.ofMinutes(15));
        } catch (Exception ex) {
            log.error("Save ProductHashCache failed: {}", ex.getMessage());
        }
    }


    private String generateProductHashCacheKey(String productId) {
        return "product:" + productId;
    }

    private String generateProductSkuListKey(String productId) {
        return "product:" + productId + ":skus";
    }
}
