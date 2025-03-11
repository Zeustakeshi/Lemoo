/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 12/14/2024 4:28 PM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.common.ProductHashCache;
import com.lemoo.product.dto.request.MediaRequest;
import com.lemoo.product.dto.request.ProductSkuRequest;
import com.lemoo.product.dto.response.ProductFeatureResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.SellerProductResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductMedia;
import com.lemoo.product.entity.ProductSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.Map;

@Mapper(componentModel = "spring")
public interface SellerProductMapper {

    @Mapping(target = "image", ignore = true)
    ProductSku toProductSku(ProductSkuRequest request);

    @Mapping(target = "skus", ignore = true)
    ProductSimpleResponse toProductSimpleResponse(Product product);

    @Mapping(target = "image", source = "product.smallImage.url")
    @Mapping(target = "skus", ignore = true)
    SellerProductResponse toProductResponse(Product product);

    @Mapping(target = "id", source = "mediaId")
    ProductMedia toProductMedia(MediaRequest mediaRequest);

    default ProductMedia toProductMedia(MediaRequest mediaRequest, Map<String, String> mediaUrls) {
        return ProductMedia.builder()
                .id(mediaRequest.getMediaId())
                .url(mediaUrls.get(mediaRequest.getMediaId()))
                .build();
    }

    @Mapping(target = "thumbnail", source = "product.smallImage.url")
    ProductFeatureResponse toProductFeatureResponse(Product product);

    @Mapping(target = "thumbnail", source = "product.smallImage.url")
    ProductHashCache toProductHashCache(Product product);
}
