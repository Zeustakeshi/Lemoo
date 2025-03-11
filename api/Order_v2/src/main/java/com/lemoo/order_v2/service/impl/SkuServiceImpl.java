/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.client.ProductClient;
import com.lemoo.order_v2.dto.response.SkuResponse;
import com.lemoo.order_v2.helper.SkuCacheHelper;
import com.lemoo.order_v2.mapper.SkuMapper;
import com.lemoo.order_v2.service.SkuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RBatch;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkuServiceImpl implements SkuService {
    private final ProductClient productClient;
    private final RedissonClient redisson;
    private final SkuMapper skuMapper;

    @Override
    public Optional<SkuResponse> getSkuBySkuCode(String skuCode) {
        String key = SkuCacheHelper.getSkuCacheKey(skuCode);

        RMap<String, String> rMap = redisson.getMap(key);
        SkuResponse skuResponse;
        if (!rMap.isExists()) {
            skuResponse = productClient.getSkuBySkuCode(skuCode).getData();

            if (skuResponse == null) return Optional.empty();

            rMap.putAll(skuMapper.toSkuMap(skuResponse));
            rMap.expireAsync(Duration.ofHours(4));
        } else {
            skuResponse = skuMapper.toSkuResponse(rMap.readAllMap());
        }
        return Optional.of(skuResponse);
    }

    public Map<String, Boolean> validateSkus(Set<String> skus) {
        // Step 1: Check Redis for existing SKUs
        Map<String, Boolean> skuStatus = batchCheckCacheProductExistence(skus);

        // Step 2: Identify missing SKUs
        Set<String> missingSkus = skuStatus.entrySet().stream()
                .filter(entry -> !entry.getValue())
                .map(Map.Entry::getKey)
                .collect(Collectors.toSet());

        // Step 3: Fetch missing SKUs from Product Service
        if (!missingSkus.isEmpty()) {
            Set<SkuResponse> skuResponses = productClient.getSkuByCodes(missingSkus).getData();
            // Step 4: Update Redis with missing products
            skuResponses.forEach(sku -> {
                RMap<String, String> rMap = redisson.getMap(SkuCacheHelper.getSkuCacheKey(sku.getSkuCode()));
                rMap.putAll(skuMapper.toSkuMap(sku));
                rMap.expireAsync(Duration.ofHours(4));
                skuStatus.put(sku.getSkuCode(), true); // Mark as valid
            });
        }
        return skuStatus;
    }

    private Map<String, Boolean> batchCheckCacheProductExistence(Set<String> skus) {

        List<String> skuList = skus.stream().toList();

        RBatch rBatch = redisson.createBatch();

        // Queue EXISTS commands for all SKUs
        skuList.forEach(sku -> rBatch.getMap(SkuCacheHelper.getSkuCacheKey(sku)).isExistsAsync());

        List<Boolean> results = rBatch.execute()
                .getResponses()
                .stream()
                .map(response -> (Boolean) response)
                .toList();

        Map<String, Boolean> statusMap = new HashMap<>();

        for (int i = 0; i < skuList.size(); i++) {
            statusMap.put(skuList.get(i), results.get(i));
        }

        return statusMap;
    }

}
