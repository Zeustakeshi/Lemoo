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
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.ProductVariantResponse;
import com.lemoo.product.entity.Category;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.exception.ConflictException;
import com.lemoo.product.exception.ForbiddenException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.ProductMapper;
import com.lemoo.product.mapper.ProductSkuMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductSkuRepository;
import com.lemoo.product.service.CategoryService;
import com.lemoo.product.service.ProductService;
import com.lemoo.product.service.SkuCodeService;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
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

    @Override
    public ProductSimpleResponse createProduct(String storeId, AuthenticatedAccount account, ProductRequest request) {
        if (!storeService.checkStorePermission(storeId, account.getId())) {
            throw new ForbiddenException("Only store owner can be modify product");
        }

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
                .smallImage(productMapper.mediaRequestToProductMedia(request.getSmallImage()))
                .images(request.getImages().stream()
                        .map(productMapper::mediaRequestToProductMedia)
                        .toList())
                .build());

        List<ProductSkuRequest> skuRequests = request.getSkus();

        List<ProductSku> productSkus = productSkuRepository.saveAll(skuRequests.stream()
                .map((skuRequest -> {
                    var sku = productMapper.productSkuRequestToProductSku(skuRequest);
                    sku.setSkuCode(skuCodeService.generateProductSku(
                            category.getCode(),
                            skuRequest.getVariants().values().stream().toList()
                    ));
                    sku.setProductId(product.getId());
                    sku.setStoreId(storeId);
                    return sku;
                }))
                .toList());

        var productResponse = productMapper.productToProductSimpleResponse(product);
        productResponse.setSkus(productSkus.stream().map(productSkuMapper::productSkuToProductSkuSimpleResponse).toList());
        return productResponse;
    }

    @Override
    public PageableResponse<ProductResponse> getAllProductByStoreId(
            String storeId, String userId, int page, int limit) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be view product");
        }

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Product> products = productRepository.findAllByStoreId(storeId, request);

        Page<ProductResponse> responses = products.map(product -> {
            List<ProductVariantResponse> variantResponses =
                    productSkuRepository.findAllByProductId(product.getId()).stream()
                            .map(productMapper::variantToVariantResponse)
                            .toList();
            ProductResponse productResponse = productMapper.productToProductResponse(product);
            productResponse.setVariants(variantResponses);
            return productResponse;
        });

        return pageMapper.toPageableResponse(responses);
    }
}
