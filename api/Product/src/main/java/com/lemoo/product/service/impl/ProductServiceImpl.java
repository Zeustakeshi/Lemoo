/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:10 PM
 * */

package com.lemoo.product.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.dto.request.ProductVariantRequest;
import com.lemoo.product.dto.request.UpdateProductRequest;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.ProductVariantResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductVariant;
import com.lemoo.product.exception.ConflictException;
import com.lemoo.product.exception.ForbiddenException;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.mapper.ProductMapper;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.repository.ProductVariantRepository;
import com.lemoo.product.service.CategoryService;
import com.lemoo.product.service.ProductService;
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
    private final ProductVariantRepository productVariantRepository;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;
    private final PageMapper pageMapper;
    private final StoreService storeService;

    @Override
    public ProductSimpleResponse updateProduct(
            String storeId,
            String userId,
            String productId,
            UpdateProductRequest request
    ) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be modify product");
        }

        Product product = productRepository.findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new NotfoundException("Product " + productId + " not found"));

        if (productRepository.existsByNameAndStoreId(request.getName(), storeId)) {
            throw new ConflictException("Product name has been existed in store");
        }

        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setStatus(ProductStatus.LIVE);
        product.setStoreId(storeId);
        product.setCategories(categoryService.getCategoryPath(request.getCategoryId()));
        product.setAttributes(request.getAttributes());

        List<ProductVariant> variants = productVariantRepository.findAllByProductId(productId);
        List<ProductVariantRequest> variantRequests = request.getVariants();

        if (variants.isEmpty()) {
            productVariantRepository.saveAll(variantRequests.stream().map((variantRequest -> {
                var variant = productMapper.variantRequestToVariant(variantRequest);
                variant.setProductId(product.getId());
                return variant;
            })).toList());
        } else {
            productVariantRepository.saveAll(variants.stream().map(variant -> {
                for (var variantRequest : variantRequests) {
                    if (variantRequest.getSellerSku().equals(variant.getSellerSku())) {
                        productMapper.updateVariant(variantRequest, variant);
                        return variant;
                    }
                }
                return variant;
            }).toList());
        }

        return productMapper.productToProductSimpleResponse(productRepository.save(product));
    }

    @Override
    public ProductSimpleResponse createProduct(String storeId, String userId) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be modify product");
        }

        if (productRepository.countDraftProducts(storeId) > MAXIMUM_DRAFT_PRODUCT) {
            throw new ForbiddenException(
                    "You have reached the maximum number of draft products allowed. Please publish or delete existing drafts before creating a new one.");
        }

        Product product = productRepository.save(Product.builder()
                .name(NanoIdUtils.randomNanoId())
                .storeId(storeId)
                .status(ProductStatus.DRAFT)
                .build());

        return productMapper.productToProductSimpleResponse(product);
    }

    @Override
    public PageableResponse<ProductResponse> getAllProductByStoreId(String storeId, String userId, int page, int limit) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be view product");
        }

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Product> products = productRepository.findAllByStoreId(storeId, request);

        Page<ProductResponse> responses = products
                .map(product -> {
                    List<ProductVariantResponse> variantResponses =
                            productVariantRepository
                                    .findAllByProductId(product.getId())
                                    .stream().map(productMapper::variantToVariantResponse)
                                    .toList();
                    ProductResponse productResponse = productMapper.productToProductResponse(product);
                    productResponse.setVariants(variantResponses);
                    return productResponse;
                });

        return pageMapper.toPageableResponse(responses);
    }


}
