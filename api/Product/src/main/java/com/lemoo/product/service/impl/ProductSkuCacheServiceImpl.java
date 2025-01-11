/*
 *  ProductSkuCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 4:34 PM
 * */


package com.lemoo.product.service.impl;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lemoo.product.dto.common.ProductSkuHashCache;
import com.lemoo.product.service.ProductSkuCacheService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RBatch;
import org.redisson.api.RMap;
import org.redisson.api.RSet;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductSkuCacheServiceImpl implements ProductSkuCacheService {
    private final RedissonClient redisson;
    private final ObjectMapper objectMapper;

    @Async
    @Override
    public void saveSkuBulkAsync(List<ProductSkuHashCache> skus) {

        RBatch batch = redisson.createBatch();
        try {
            for (var sku : skus) {
                Map<String, String> skuMap = Map.of(
                        "id", sku.getId(),
                        "skuCode", sku.getSkuCode(),
                        "name", sku.getName(),
                        "image", sku.getImage(),
                        "variants", toVariantString(sku.getVariants()),
                        "price", String.valueOf(sku.getPrice()),
                        "stock", String.valueOf(sku.getStock())
                );
                String key = generateSkuHashCacheKey(sku.getSkuCode());
                var skuCache = batch.getMap(key);
                skuCache.putAllAsync(skuMap);
                skuCache.expireAsync(Duration.ofMinutes(10));
            }
            batch.execute();
        } catch (Exception ex) {
            log.error("Save ProductSkuHashCache failed message:{}", ex.getMessage());
        }
    }

    @Override
    @Async
    public void addSkuToProductAsync(String productId, Set<String> sks) {
        String key = generateProductSkuListKey(productId);
        try {
            RSet<String> rSet = redisson.getSet(key);
            rSet.addAll(sks);
            rSet.expire(Duration.ofDays(7));
        } catch (Exception ex) {
            log.error("addSkuToProductAsync failed: {}", ex.getMessage());
        }
    }

    @Async
    public void addSkuToStoreAsync(String storeId, Set<String> skus) {
        String key = generateStoreSkuListKey(storeId);
        try {
            Map<Object, Double> skuCaches = new HashMap<>();

            skus.forEach(sku -> {
                skuCaches.put(sku, 1.0);
            });

            var cache = redisson.getScoredSortedSet(key);
            cache.addAll(skuCaches);
            cache.expire(Duration.ofDays(7));

        } catch (Exception ex) {
            log.error("addSkuToStoreAsync failed: {}", ex.getMessage());
        }
    }

    @Override
    public List<String> geAllSkuByProductId(String productId) {
        RSet<String> rSet = redisson.getSet(generateProductSkuListKey(productId));
        return rSet.stream().toList();
    }

    @Override
    public ProductSkuHashCache getProductSkuByCode(String skuCode) {
        RMap<String, String> rMap = redisson.getMap(generateSkuHashCacheKey(skuCode));
        return toProductSkuHashCache(rMap.readAllMap());
    }

    private String generateSkuHashCacheKey(String skuCode) {
        return "sku:" + skuCode;
    }

    private String generateStoreSkuListKey(String storeId) {
        return "store:" + storeId + ":skus";
    }

    private String generateProductSkuListKey(String productId) {
        return "product:" + productId + ":skus";
    }

    private String toVariantString(Map<String, String> variants) throws JsonProcessingException {
        return objectMapper.writeValueAsString(variants);
    }

    private Map<String, String> toVariantValue(String variantString) throws JsonProcessingException {
        return objectMapper.readValue(variantString, Map.class);
    }

    @SneakyThrows
    private ProductSkuHashCache toProductSkuHashCache(Map<String, String> source) {
        try {
            return ProductSkuHashCache.builder()
                    .id(source.get("id"))
                    .skuCode(source.get("skuCode"))
                    .image(source.get("image"))
                    .name(source.get("name"))
                    .variants(toVariantValue(source.get("variants")))
                    .stock(Long.parseLong(source.get("stock")))
                    .price(Long.parseLong(source.get("price")))
                    .totalSold(Long.parseLong(source.get("totalSold")))
                    .build();
        } catch (Exception ex) {
            log.error("toProductSkuHashCache failed {}", ex.getMessage());
            throw ex;
        }
    }
}
