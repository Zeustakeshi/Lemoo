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
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class SkuServiceImpl implements SkuService {
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
}
