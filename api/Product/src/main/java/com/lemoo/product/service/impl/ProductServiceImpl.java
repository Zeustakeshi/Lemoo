/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:25 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.dto.response.ProductDetailResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.ProductMapper;
import com.lemoo.product.mapper.ProductSkuMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductSkuRepository productSkuRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductSkuMapper productSkuMapper;

    @Override
    public ProductDetailResponse getProductById(String productId) {
        Product product = productRepository.findByIdAndStatus(productId, ProductStatus.LIVE)
                .orElseThrow(() -> new NotfoundException("Product not found"));
        List<ProductSku> skus = productSkuRepository.findAllByProductId(productId);
        ProductDetailResponse productResponse = productMapper.toProductDetailResponse(product);
        productResponse.setSkus(skus.stream().map(sku -> {
            var skuResponse = productSkuMapper.toProductSkuResponse(sku);
            skuResponse.setPromotionPrice(sku.getPrice() - 100);
            return skuResponse;
        }).toList());

        // only for test
        productResponse.setTotalSold(1000L);
        productResponse.setRattingCount(100L);
        productResponse.setSoldOut(false);
        productResponse.setRatting(4.5);

        return productResponse;
    }
}
