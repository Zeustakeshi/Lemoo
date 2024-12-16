/*
 *  ProductMediaServiceImpl
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:48 PM
 * */

package com.lemoo.product.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.common.enums.MediaType;
import com.lemoo.product.common.enums.ProductImageType;
import com.lemoo.product.dto.request.DeleteProductImageRequest;
import com.lemoo.product.dto.request.UploadProductImageRequest;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductMedia;
import com.lemoo.product.exception.BadRequestException;
import com.lemoo.product.exception.ForbiddenException;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.exception.ResourceUploadException;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.service.ProductMediaService;
import com.lemoo.product.service.ResourceService;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductMediaServiceImpl implements ProductMediaService {
    private static final Integer MAXIMUM_PRODUCT_IMAGE = 5;

    private final ResourceService resourceService;
    private final StoreService storeService;
    private final ProductRepository productRepository;

    @Override
    public ProductMedia uploadImage(
            String storeId, String userId, String productId, UploadProductImageRequest request) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be upload or delete product image");
        }

        Product product = productRepository
                .findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new NotfoundException("Product " + productId + " not found"));

        return switch (ProductImageType.fromValue(request.getType())) {
            case SMALL -> uploadProductSmallImage(product, request.getImage());
            case PRODUCT -> uploadProductImage(product, request.getImage(), request.getImageId());
            case VARIANT -> uploadProductVariantImage(product, request.getImage());
        };
    }

    @SneakyThrows
    @Override
    public void deleteImage(String storeId, String userId, String productId, DeleteProductImageRequest request) {
        if (!storeService.checkStorePermission(storeId, userId)) {
            throw new ForbiddenException("Only store owner can be upload or delete product image");
        }

        Product product = productRepository
                .findByIdAndStoreId(productId, storeId)
                .orElseThrow(() -> new NotfoundException("Product " + productId + " not found"));

        switch (ProductImageType.fromValue(request.getType())) {
            case PRODUCT -> {
                var isExistedImage = product.getImages() != null && product.getImages().stream().anyMatch(img -> img.getId().equals(request.getImageId()));
                if (!isExistedImage) {
                    throw new NotfoundException("Image not found");
                }
                product.setImages(product.getImages().stream()
                        .filter(image -> !image.getId().equals(request.getImageId()))
                        .toList());
                resourceService.deleteImages(List.of(request.getImageId()), "/images/banner");
            }
            case SMALL -> {
                var isExistedImage = product.getSmallImage() != null && product.getSmallImage().getId().equals(request.getImageId());
                if (!isExistedImage) {
                    throw new NotfoundException("Image not found");
                }
                product.setSmallImage(null);
                resourceService.deleteImages(List.of(request.getImageId()), "/images/small");
            }
            case VARIANT -> throw new ForbiddenException("can't remove product variant image");
        }

        productRepository.save(product);
    }

    private ProductMedia uploadProductSmallImage(Product product, MultipartFile image) {
        ProductMedia smallImage =
                ProductMedia.builder().id(product.getId()).type(MediaType.IMAGE).build();
        try {
            var response = resourceService.uploadImage(
                    resourceService.ConvertMultipartToByte(image), smallImage.getId(), "/images/small");

            smallImage.setUrl(response.getSecureUrl());

            product.setSmallImage(smallImage);

            productRepository.save(product);

            return smallImage;

        } catch (Exception ex) {
            throw new ResourceUploadException(ex.getMessage());
        }
    }

    private ProductMedia uploadProductImage(Product product, MultipartFile image, String imageId) {

        if (product.getImages() == null) {
            product.setImages(new ArrayList<>());
        }

        if (product.getImages().size() >= MAXIMUM_PRODUCT_IMAGE) {
            throw new BadRequestException("A product can have a maximum of 5 images.");
        }

        ProductMedia productImage = ProductMedia.builder()
                .id(imageId != null ? imageId : NanoIdUtils.randomNanoId())
                .type(MediaType.IMAGE).build();

        try {
            var response = resourceService.uploadImage(
                    resourceService.ConvertMultipartToByte(image), productImage.getId(), "/images/banner");

            productImage.setUrl(response.getSecureUrl());

            product.getImages().add(productImage);

            productRepository.save(product);

            return productImage;
        } catch (Exception ex) {
            throw new ResourceUploadException(ex.getMessage());
        }
    }

    private ProductMedia uploadProductVariantImage(Product product, MultipartFile image) {
        throw new ResourceUploadException("Method not implement");
    }
}
