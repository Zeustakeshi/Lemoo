/*
 *  VoucherProductCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 11:15 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.service.VoucherCacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RSet;
import org.redisson.api.RedissonClient;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoucherCacheServiceImpl implements VoucherCacheService {

    private final RedissonClient redisson;


    @Override
    public String generateProductVoucherKey(String productId) {
        return "sku:" + productId + ":vouchers";
    }

    @Async
    @Override
    public void addProductVoucherAsyncBulkAsync(Set<String> skus, String voucherId) {
        try {
            for (var sku : skus) {
                String key = generateProductVoucherKey(sku);
                RSet<String> skuVouchers = redisson.getSet(key);
                skuVouchers.add(voucherId);
                skuVouchers.expire(Duration.ofHours(12));
            }
        } catch (Exception exception) {
            log.error("addProductVoucherAsyncBulkAsync failed message: {}", exception.getMessage());
        }
    }

    @Override
    @Async
    public void addProductVoucherAsync(String sku, String voucherId) {
        String key = generateProductVoucherKey(sku);
        RSet<String> skuVouchers = redisson.getSet(key);
        try {
            skuVouchers.add(voucherId);
            skuVouchers.expire(Duration.ofHours(12));
        } catch (Exception exception) {
            log.error("addProductVoucherAsync failed key: {} message: {}", key, exception.getMessage());
        }
    }

    @Async
    @Override
    public void updateVoucherProductsAsync(String sku, Set<String> vouchers) {
        String key = generateProductVoucherKey(sku);
        RSet<String> skuVouchers = redisson.getSet(key);
        try {
            skuVouchers.addAll(vouchers);
            skuVouchers.expire(Duration.ofHours(12));
        } catch (Exception exception) {
            log.error("updateVoucherProducts failed key: {} message: {}", key, exception.getMessage());
        }
    }


}
