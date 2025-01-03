/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:10 PM
 * */

package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.dto.common.AuthenticatedAccount;
import com.lemoo.product.dto.request.ProductRequest;
import com.lemoo.product.dto.request.ProductSkuRequest;
import com.lemoo.product.dto.response.*;
import com.lemoo.product.entity.Category;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.ConflictException;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.ProductMapper;
import com.lemoo.product.mapper.ProductSkuMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceImpl implements ProductService {
    private static final Integer MAXIMUM_DRAFT_PRODUCT = 10;
    private final ProductRepository productRepository;
    private final ProductSkuRepository productSkuRepository;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;
    private final PageMapper pageMapper;
    private final StoreService storeService;
    private final SkuCodeService skuCodeService;
    private final ProductSkuMapper productSkuMapper;
    private final MongoTemplate mongoTemplate;
    private final ProductCacheService productCacheService;
    private final ProductSkuCacheService productSkuCacheService;

    @Override
    public PageableResponse<ProductFeatureResponse> getTestRecommendProduct(int page, int limit) {

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<Product> products = productRepository.findAll(request);

        Page<ProductFeatureResponse> productFeatureResponses = products
                .map(product ->
                        CompletableFuture.supplyAsync(() -> {
                            ProductFeatureResponse productResponse = productMapper.toProductFeatureResponse(product);

                            Query query = new Query();
                            query.addCriteria(Criteria.where("productId").is(product.getId()));
                            query.limit(1);
                            var firstSku = mongoTemplate.findOne(query, ProductSku.class);

                            if (firstSku == null) {
                                throw new NotfoundException("Sku not found");
                            }

                            productResponse.setRatingCount(10000L);
                            productResponse.setRatting(4.5);
                            productResponse.setOriginPrice(firstSku.getPrice());
                            productResponse.setPromotionPrice(firstSku.getPrice() - 1);
                            productResponse.setTotalSold(firstSku.getTotalSold());

                            return productResponse;
                        })
                ).map(CompletableFuture::join);

        return pageMapper.toPageableResponse(productFeatureResponses);
    }

    @Override
    public ProductSimpleResponse createProduct(String storeId, AuthenticatedAccount account, ProductRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        if (productRepository.existsByNameAndStoreId(request.getName(), storeId)) {
            throw new ConflictException("Product name has been existed in store");
        }

        // TODO: validate image with media service

        Category category = categoryService.findById(request.getCategoryId());

        category.getPaths().add(category.getId());

        Product product = productRepository.save(Product.builder()
                .status(ProductStatus.LIVE) // TODO: change it in production
                .storeId(storeId)
                .categories(category.getPaths())
                .name(request.getName())
                .description(request.getDescription())
                .variants(request.getVariants())
                .smallImage(productMapper.toProductMedia(request.getSmallImage()))
                .images(request.getImages().stream()
                        .map(productMapper::toProductMedia)
                        .toList())
                .build());

        List<ProductSkuRequest> skuRequests = request.getSkus();

        List<ProductSku> productSkus = productSkuRepository.saveAll(skuRequests.stream()
                .map((skuRequest -> {
                    var sku = productMapper.toProductSku(skuRequest);
                    if (sku.getImage() == null) sku.setImage(product.getSmallImage());
                    sku.setSkuCode(skuCodeService.generateProductSku(
                            category.getCode(),
                            skuRequest.getVariants().values().stream().toList()
                    ));
                    sku.setProductId(product.getId());
                    sku.setStoreId(storeId);
                    return sku;
                }))
                .toList());

        // save cache
        Set<String> productSkuCodes = productSkus.stream().map(ProductSku::getSkuCode).collect(Collectors.toSet());
        productCacheService.saveProductAsync(productMapper.toProductHashCache(product));
        productSkuCacheService.saveSkuBulkAsync(productSkus.stream().map(productSkuMapper::toProductSkuCache).toList());
        productSkuCacheService.addSkuToStoreAsync(storeId, productSkuCodes);
        productSkuCacheService.addSkuToProductAsync(product.getId(), productSkuCodes);

        var productResponse = productMapper.toProductSimpleResponse(product);
        productResponse.setSkus(productSkus.stream().map(productSkuMapper::toProductSkuSimpleResponse).toList());
        return productResponse;
    }

    @Override
    public PageableResponse<ProductResponse> getAllProductByStoreId(
            String storeId, AuthenticatedAccount account, int page, int limit) {

        storeService.verifyStore(account.getId(), storeId);

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Product> products = productRepository.findAllByStoreId(storeId, request);

        Page<ProductResponse> responses = products.map(product -> {
            List<ProductVariantResponse> variantResponses =
                    productSkuRepository.findAllByProductId(product.getId()).stream()
                            .map(productMapper::toVariantResponse)
                            .toList();
            ProductResponse productResponse = productMapper.toProductResponse(product);
            productResponse.setVariants(variantResponses);
            return productResponse;
        });

        return pageMapper.toPageableResponse(responses);
    }


}
