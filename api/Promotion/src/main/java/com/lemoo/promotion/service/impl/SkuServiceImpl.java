/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.client.ProductClient;
import com.lemoo.promotion.dto.response.SkuResponse;
import com.lemoo.promotion.helper.SkuCacheHelper;
import com.lemoo.promotion.mapper.SkuMapper;
import com.lemoo.promotion.service.SkuService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RBatch;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SkuServiceImpl implements SkuService {
    private static final Logger log = LoggerFactory.getLogger(SkuServiceImpl.class);
    private final ProductClient productClient;
    private final RedissonClient redisson;
    private final SkuMapper skuMapper;

    @Override
    public SkuResponse getSkuBySkuCode(String skuCode) {
        String key = SkuCacheHelper.getSkuCacheKey(skuCode);

        RMap<String, String> rMap = redisson.getMap(key);
        SkuResponse skuResponse;
        if (!rMap.isExists()) {
            skuResponse = productClient.getSkuBySkuCode(skuCode).getData();
            rMap.putAll(skuMapper.toSkuMap(skuResponse));
            rMap.expireAsync(Duration.ofHours(4));
        } else {
            skuResponse = skuMapper.toSkuResponse(rMap.readAllMap());
        }
        return skuResponse;
    }

    @Override
    public Map<String, Boolean> validateSkus(Set<String> skus) {
        // Step 1: Check Redis for existing SKUs
        Map<String, Boolean> skuStatus = batchCheckProductExistence(skus);

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

    private Map<String, Boolean> batchCheckProductExistence(Set<String> skus) {

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
