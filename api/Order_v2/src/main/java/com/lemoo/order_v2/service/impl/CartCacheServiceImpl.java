/*
 *  CartCaheServiceImpl
 *  @author: Minhhieuano
 *  @created 2/26/2025 10:48 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.helper.CartCacheHelper;
import com.lemoo.order_v2.helper.PageHelper;
import com.lemoo.order_v2.service.CartCacheService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RScoredSortedSet;
import org.redisson.api.RedissonClient;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CartCacheServiceImpl implements CartCacheService {

    private final RedissonClient redisson;

    @Override
    @Async
    public void addCartItemToCart(String userId, String cartItemId) {
        String key = CartCacheHelper.getCartCacheKey(userId);
        RScoredSortedSet<String> rSet = redisson.getScoredSortedSet(key);
        rSet.add(System.currentTimeMillis(), cartItemId);
    }

    @Override
    public Page<String> getCartCache(String userId, Pageable pageable) {
        // Generate the Redis key for the user's cart
        String key = CartCacheHelper.getCartCacheKey(userId);

        //  Retrieve the set of cart item IDs from Redis
        RScoredSortedSet<String> sortedSet = redisson.getScoredSortedSet(key);

        if (!sortedSet.isExists()) {
            return new PageImpl<>(List.of(), pageable, 0);
        }

        // Calculate pagination metadata
        int page = pageable.getPageNumber();
        int size = pageable.getPageSize();
        int totalElements = sortedSet.size();
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size - 1, totalElements - 1);

        // Retrieve paginated items using ZRANGE
        List<String> paginatedItems = sortedSet.valueRange(startIndex, endIndex).stream().toList();

        // Build and return the Page object
        return PageHelper.toPage(paginatedItems, pageable);
    }
}
