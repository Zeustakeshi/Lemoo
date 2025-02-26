/*
 *  CartItemCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:02 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.dto.common.CartItemCache;
import com.lemoo.order_v2.helper.CartItemCacheHelper;
import com.lemoo.order_v2.mapper.CartItemCacheMapper;
import com.lemoo.order_v2.service.CartItemCacheService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RMap;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class CartItemCacheServiceImpl implements CartItemCacheService {

    private final RedissonClient redisson;
    private final CartItemCacheMapper cartItemCacheMapper;

    @Override
    @Async
    public void saveToCache(CartItemCache cartItemCache) {
        String key = CartItemCacheHelper.getCartItemCacheKey(cartItemCache.getId());
        RMap<String, String> rMap = redisson.getMap(key);
        rMap.putAll(cartItemCacheMapper.toCartItemCacheMap(cartItemCache));
        rMap.expireAsync(Duration.ofDays(1));
    }

}
