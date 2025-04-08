/*
 *  ProductOrderServiceImpl
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:16 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.ProductOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.redisson.api.RLock;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductOrderServiceImpl implements ProductOrderService {
    private final ProductSkuRepository productSkuRepository;
    private final RedissonClient redisson;

    @Override
    public void reserveProduct(Map<String, Integer> skuInfos) throws Exception {
        Set<ProductSku> skus = productSkuRepository.findBySkuCodeIn(skuInfos.keySet());

        if (skuInfos.size() != skus.size() ||
                !skuInfos.keySet().equals(skus.stream()
                        .map(ProductSku::getSkuCode).collect(Collectors.toSet())
                )
        ) {
            throw new Exception("The SKU codes do not match the actual data.");
        }

        List<RLock> locks = new ArrayList<>();
        try {
            for (ProductSku sku : skus) {
                RLock lock = redisson.getLock("inventory-lock:" + sku.getSkuCode());
                locks.add(lock);
            }
            RLock multiLock = redisson.getMultiLock(locks.toArray(new RLock[0]));

            if (!multiLock.tryLock(10, 60, TimeUnit.SECONDS)) {
                throw new Exception("Failed to acquire locks for inventory reservation.");
            }

            try {
                for (ProductSku sku : skus) {
                    String skuCode = sku.getSkuCode();
                    long reserveStock = sku.getReserveStock();
                    int reserveQuantity = skuInfos.get(skuCode);

                    if (reserveStock < reserveQuantity) {
                        throw new Exception("SKU " + skuCode + " is out of stock.");
                    }
                    sku.setReserveStock(reserveStock - reserveQuantity);
                }

                productSkuRepository.saveAll(skus);
            } finally {
                multiLock.unlock();
            }
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new Exception("Reservation interrupted.", e);
        }
    }
}
