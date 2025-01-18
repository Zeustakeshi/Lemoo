/*
 *  ProductOrderServiceImpl
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:16 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.domain.OrderSku;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.event.eventModel.ProductReserveFailedEvent;
import com.lemoo.product.event.eventModel.ProductReservedEvent;
import com.lemoo.product.event.producer.OrderProducer;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.ProductOrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductOrderServiceImpl implements ProductOrderService {
    private final ProductRepository productRepository;
    private final ProductSkuRepository productSkuRepository;
    private final OrderProducer orderProducer;

    @Override
    public void checkProductOrder(String orderId, Map<String, OrderSku> orderSkus) {
        Set<String> productIds = orderSkus
                .values()
                .stream()
                .map(OrderSku::getProductId)
                .collect(Collectors.toSet());

        try {
            validateActiveProduct(orderId, productIds);

            Set<String> skuCodes = orderSkus.keySet();
            Set<ProductSku> productSkus = productSkuRepository.findBySkuCodeIn(skuCodes);

            if (productSkus.isEmpty()) {
                orderProducer.reserveProductFailed(ProductReserveFailedEvent.builder()
                        .orderId(orderId)
                        .errorMessage("Sku list is empty")
                        .build());
                return;
            }

            productSkus.stream().map(sku -> CompletableFuture.runAsync(() -> {
                OrderSku orderSku = orderSkus.get(sku.getSkuCode());
                if (orderSku == null) {
                    throw new RuntimeException("Sku " + sku.getSkuCode() + " not found");
                }
                validateSku(orderId, sku, orderSku.getQuantity());
                reserveSku(orderId, sku, orderSku.getQuantity());
            })).forEach(CompletableFuture::join);
        } catch (Exception ex) {
            log.error(ex.getMessage());
        }

    }

    private void validateActiveProduct(String orderId, Set<String> productIds) {
        if (productRepository.countActiveProducts(productIds) != productIds.size()) {
            String errorMessage = "product not active";
            orderProducer.reserveProductFailed(ProductReserveFailedEvent.builder()
                    .orderId(orderId)
                    .errorMessage(errorMessage)
                    .build());

            log.error(errorMessage);
            throw new RuntimeException(errorMessage);
        }
    }


    private void validateSku(String orderId, ProductSku sku, int quantity) {
        if (!sku.isAllowSale()) {
            String errorMessage = "sku " + sku + " not allow sale";
            log.error(errorMessage);
            orderProducer.reserveProductFailed(ProductReserveFailedEvent.builder()
                    .orderId(orderId)
                    .errorMessage(errorMessage)
                    .build());
            throw new RuntimeException(errorMessage);
        }
        if ((sku.getStock() - quantity) < 0) {
            String errorMessage = "sku " + sku + " is out of stock";
            log.error(errorMessage);
            orderProducer.reserveProductFailed(ProductReserveFailedEvent.builder()
                    .orderId(orderId)
                    .errorMessage(errorMessage)
                    .build());
            throw new RuntimeException(errorMessage);
        }

    }

    private void reserveSku(String orderId, ProductSku sku, int quantity) {
        //TODO: handle distributed lock here
        sku.setStock(sku.getStock() - quantity);
        productSkuRepository.save(sku);

        orderProducer.reservedProduct(ProductReservedEvent.builder()
                .orderId(orderId)
                .build());
    }

}
