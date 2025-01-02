/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 12/14/2024 4:28 PM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.request.MediaRequest;
import com.lemoo.product.dto.request.ProductSkuRequest;
import com.lemoo.product.dto.response.ProductFeatureResponse;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.ProductVariantResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductMedia;
import com.lemoo.product.entity.ProductSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "image", ignore = true)
    ProductSku productSkuRequestToProductSku(ProductSkuRequest request);

    ProductSimpleResponse productToProductSimpleResponse(Product product);

    @Mapping(target = "image", source = "product.smallImage.url")
    @Mapping(target = "variants", ignore = true)
    ProductResponse productToProductResponse(Product product);

    ProductVariantResponse variantToVariantResponse(ProductSku variant);

    @Mapping(target = "id", source = "mediaId")
    ProductMedia mediaRequestToProductMedia(MediaRequest mediaRequest);

    @Mapping(target = "thumbnail", source = "product.smallImage.url")
    ProductFeatureResponse productToProductFeatureResponse(Product product);
}
