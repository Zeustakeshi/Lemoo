/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:25 PM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductDetailResponse;
import com.lemoo.product.dto.response.ProductFeatureResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.ProductMapper;
import com.lemoo.product.mapper.ProductSkuMapper;
import com.lemoo.product.mapper.SellerProductMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    private final ProductSkuRepository productSkuRepository;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final ProductSkuMapper productSkuMapper;
    private final PageMapper pageMapper;
    private final SellerProductMapper sellerProductMapper;
    private final MongoTemplate mongoTemplate;

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

    @Override
    public PageableResponse<ProductResponse> getProductByStoreId(String storeId, int page, int limit) {
        PageRequest request = PageRequest.of(page, limit, Sort.Direction.DESC, "createdAt");
        Page<Product> products = productRepository.findAllByStoreIdAndStatus(storeId, ProductStatus.LIVE, request);

        Page<ProductFeatureResponse> productFeatureResponses = products
                .map(product ->
                        CompletableFuture.supplyAsync(() -> {
                            ProductFeatureResponse productResponse = sellerProductMapper.toProductFeatureResponse(product);

                            Query query = new Query();
                            query.addCriteria(Criteria.where("productId").is(product.getId()));
                            query.limit(1);
                            var firstSku = mongoTemplate.findOne(query, ProductSku.class);

                            if (firstSku == null) {
                                throw new NotfoundException("Sku not found");
                            }

                            productResponse.setRattingCount(10000L);
                            productResponse.setRatting(4.5);
                            productResponse.setOriginPrice(firstSku.getPrice());
                            productResponse.setTotalSold(1000L);
                            productResponse.setPromotionPrice(firstSku.getPrice() - 1);
                            return productResponse;
                        })
                ).map(CompletableFuture::join);

        return pageMapper.toPageableResponse(productFeatureResponses);
    }
}
