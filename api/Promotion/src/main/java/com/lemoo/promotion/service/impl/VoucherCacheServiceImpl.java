/*
 *  VoucherProductCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 1/2/2025 11:15 AM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.service.VoucherCacheService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

import java.time.Duration;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class VoucherCacheServiceImpl implements VoucherCacheService {

    private final Jedis jedis;


    @Override
    public String generateProductVoucherKey(String productId) {
        return "sku:" + productId + ":vouchers";
    }

    @Async
    @Override
    public void addProductVoucherAsyncBulkAsync(Set<String> skus, String voucherId) {
        long ttl = Duration.ofDays(1).getSeconds();
        try {
            Pipeline pipeline = jedis.pipelined();

            for (var sku : skus) {
                String key = generateProductVoucherKey(sku);
                pipeline.sadd(key, voucherId);
                pipeline.expire(key, ttl);
            }

            pipeline.sync();
        } catch (Exception exception) {
            log.error("addProductVoucherAsyncBulkAsync failed message: {}", exception.getMessage());
        }
    }

    @Override
    @Async
    public void addProductVoucherAsync(String sku, String voucherId) {
        String key = generateProductVoucherKey(sku);
        long ttl = Duration.ofDays(1).getSeconds();
        try {
            jedis.sadd(key, voucherId);
            jedis.expire(key, ttl);
        } catch (Exception exception) {
            log.error("addProductVoucherAsync failed key: {} message: {}", key, exception.getMessage());
        }
    }

    @Async
    @Override
    public void updateVoucherProductsAsync(String sku, Set<String> vouchers) {
        String key = generateProductVoucherKey(sku);
        long ttl = Duration.ofDays(1).getSeconds();
        try {
            Pipeline pipeline = jedis.pipelined();
            for (String voucher : vouchers) {
                pipeline.sadd(key, voucher);
            }
            pipeline.expire(key, ttl);
            pipeline.sync();
        } catch (Exception exception) {
            log.error("updateVoucherProducts failed key: {} message: {}", key, exception.getMessage());
        }
    }


}
