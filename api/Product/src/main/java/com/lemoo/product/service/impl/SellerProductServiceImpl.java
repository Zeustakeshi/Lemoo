/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:10 PM
 * */

package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.common.utils.SkuGenerator;
import com.lemoo.product.dto.common.AuthenticatedAccount;
import com.lemoo.product.dto.request.MediaRequest;
import com.lemoo.product.dto.request.ProductRequest;
import com.lemoo.product.dto.request.ProductSkuRequest;
import com.lemoo.product.dto.request.ProductVariantRequest;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.SellerProductResponse;
import com.lemoo.product.dto.response.SellerProductSkuResponse;
import com.lemoo.product.entity.*;
import com.lemoo.product.exception.ConflictException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.SellerProductMapper;
import com.lemoo.product.mapper.SellerProductSkuMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.CategoryService;
import com.lemoo.product.service.ProductMediaService;
import com.lemoo.product.service.SellerProductService;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SellerProductServiceImpl implements SellerProductService {
    private static final Integer MAXIMUM_DRAFT_PRODUCT = 10;
    private final ProductRepository productRepository;
    private final ProductSkuRepository productSkuRepository;
    private final CategoryService categoryService;
    private final SellerProductMapper sellerProductMapper;
    private final PageMapper pageMapper;
    private final StoreService storeService;
    private final SellerProductSkuMapper sellerProductSkuMapper;
    private final ProductMediaService productMediaService;

    @Override
    public ProductSimpleResponse createProduct(String storeId, AuthenticatedAccount account, ProductRequest request) {
        storeService.verifyStore(account.getId(), storeId);

        if (productRepository.existsByNameAndStoreId(request.getName(), storeId)) {
            throw new ConflictException("Product name has been existed in store");
        }

        Set<String> mediaIds = getMediaIdListFromProductRequest(request);
        Map<String, String> mediaUrls = productMediaService.batchGetMediaUrl(mediaIds, storeId);

        Category category = categoryService.findById(request.getCategoryId());

        category.getPaths().add(category.getId());

        Product product = productRepository.save(Product.builder()
                .status(ProductStatus.LIVE) // TODO: change it in production
                .storeId(storeId)
                .categories(category.getPaths())
                .name(request.getName())
                .description(request.getDescription())
                .variants(toProductVariant(request.getVariants()))
                .smallImage(sellerProductMapper.toProductMedia(request.getSmallImage(), mediaUrls))
                .images(request.getImages().stream()
                        .map(sellerProductMapper::toProductMedia)
                        .toList())
                .build());

        List<ProductSkuRequest> skuRequests = request.getSkus();

        List<ProductSku> productSkus = productSkuRepository.saveAll(skuRequests.stream()
                .map((skuRequest -> {
                    var sku = sellerProductMapper.toProductSku(skuRequest);

                    sku.setImage(sellerProductMapper.toProductMedia(skuRequest.getImage(), mediaUrls));

                    sku.setSkuCode(SkuGenerator.generateSKU(
                            product.getId(),
                            skuRequest.getVariants().values().stream().toList()
                    ));

                    sku.setProductId(product.getId());
                    sku.setStoreId(storeId);
                    return sku;
                }))
                .toList());

        // save cache
//        Set<String> productSkuCodes = productSkus.stream().map(ProductSku::getSkuCode).collect(Collectors.toSet());
//        productCacheService.saveProductAsync(productMapper.toProductHashCache(product));
//        productSkuCacheService.saveSkuBulkAsync(productSkus.stream().map(productSkuMapper::toProductSkuCache).toList());
//        productSkuCacheService.addSkuToStoreAsync(storeId, productSkuCodes);
//        productSkuCacheService.addSkuToProductAsync(product.getId(), productSkuCodes);

        var productResponse = sellerProductMapper.toProductSimpleResponse(product);
        productResponse.setSkus(productSkus.stream().map(sellerProductSkuMapper::toProductSkuSimpleResponse).toList());
        return productResponse;
    }

    @Override
    public PageableResponse<SellerProductResponse> getAllProductByStoreId(
            String storeId, AuthenticatedAccount account, int page, int limit) {

        storeService.verifyStore(account.getId(), storeId);

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Product> products = productRepository.findAllByStoreId(storeId, request);

        Page<SellerProductResponse> responses = products.map(product ->
                CompletableFuture.supplyAsync(() -> {
                    List<SellerProductSkuResponse> skuResponse =
                            productSkuRepository.findAllByProductId(product.getId()).stream()
                                    .map(sellerProductSkuMapper::toSkuResponse)
                                    .toList();
                    SellerProductResponse sellerProductResponse = sellerProductMapper.toProductResponse(product);
                    sellerProductResponse.setSkus(skuResponse);
                    return sellerProductResponse;
                })
        ).map(CompletableFuture::join);

        return pageMapper.toPageableResponse(responses);
    }


    private List<ProductVariant> toProductVariant(List<ProductVariantRequest> request) {
        return request.stream().map(variant -> ProductVariant
                .builder()
                .name(variant.getName())
                .values(variant.getValues().stream()
                        .map(value -> ProductVariantValue
                                .builder()
                                .code(SkuGenerator.hashToBase62(value))
                                .name(value)
                                .build()
                        ).toList())
                .build()).toList();
    }

    private Set<String> getMediaIdListFromProductRequest(ProductRequest productRequest) {
        Set<String> mediaIds = productRequest
                .getImages()
                .stream()
                .map(MediaRequest::getMediaId)
                .collect(Collectors.toSet());

        mediaIds.addAll(
                productRequest
                        .getSkus()
                        .stream()
                        .map(skuRequest -> skuRequest.getImage().getMediaId())
                        .toList()
        );

        return mediaIds;
    }
}
