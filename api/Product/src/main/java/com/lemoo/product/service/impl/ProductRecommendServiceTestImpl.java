/*
 *  ProductRecommendServiceImpl
 *  @author: Minhhieuano
 *  @created 1/4/2025 12:07 AM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductFeatureResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.SellerProductMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.service.ProductRecommendService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ProductRecommendServiceTestImpl implements ProductRecommendService {
    private final ProductRepository productRepository;
    private final SellerProductMapper sellerProductMapper;
    private final MongoTemplate mongoTemplate;
    private final PageMapper pageMapper;

    @Override
    public PageableResponse<ProductFeatureResponse> getProductFeature(int page, int limit) {

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "createdAt"));

        Page<Product> products = productRepository.findAllByStatus(ProductStatus.LIVE, request);

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
                            if (productResponse.getThumbnail() == null) {
                                productResponse.setThumbnail(firstSku.getImage().getUrl());
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
