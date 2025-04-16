/*
 *  ProductAnalysisServiceImpl
 *  @author: pc
 *  @created 4/16/2025 8:52 AM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.dto.response.StoreResponse;
import com.lemoo.product.entity.Category;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.event.eventModel.ProductAnalysisEvent;
import com.lemoo.product.event.producer.ProductAnalysisProducer;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.CategoryService;
import com.lemoo.product.service.ProductAnalysisService;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductAnalysisServiceImpl implements ProductAnalysisService {

    private final ProductAnalysisProducer productAnalysisProducer;
    private final CategoryService categoryService;
    private final StoreService storeService;
    private final ProductSkuRepository skuRepository;

    @Async
    @Override
    public void analyzeProduct(Product product) {
        Set<String> categories = categoryService
                .getCategoriesBulk(product.getCategories())
                .stream().map(Category::getName).collect(Collectors.toSet());

        StoreResponse storeResponse = storeService.getStoreInfo(product.getStoreId());

        ProductAnalysisEvent.Store store = ProductAnalysisEvent.Store.builder()
                .id(storeResponse.getId())
                .name(storeResponse.getName())
                .build();

        List<ProductSku> productSkus = skuRepository.findAllByProductId(product.getId());

        Set<ProductAnalysisEvent.ProductSku> skus = productSkus.stream().map(sku ->
                ProductAnalysisEvent.ProductSku.builder()
                        .name(sku.getName())
                        .price(sku.getPrice())
                        .skuCode(sku.getSkuCode())
                        .variants(sku.getVariants())
                        .build()
        ).collect(Collectors.toSet());

        productAnalysisProducer.analyzeProduct(ProductAnalysisEvent.builder()
                .name(product.getName())
                .productId(product.getId())
                .categories(categories)
                .description(product.getDescription())
                .store(store)
                .skus(skus)
                .build());
    }
}
