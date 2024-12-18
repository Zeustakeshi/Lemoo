/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 12/14/2024 4:28 PM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.request.ProductVariantRequest;
import com.lemoo.product.dto.response.ProductResponse;
import com.lemoo.product.dto.response.ProductSimpleResponse;
import com.lemoo.product.dto.response.ProductVariantResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductVariant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {

    @Mapping(target = "image", ignore = true)
    ProductVariant variantRequestToVariant(ProductVariantRequest request);

    ProductSimpleResponse productToProductSimpleResponse(Product product);

    @Mapping(target = "image", source = "product.smallImage.url")
    @Mapping(target = "variants", ignore = true)
    ProductResponse productToProductResponse(Product product);

    ProductVariantResponse variantToVariantResponse(ProductVariant variant);

    @Mapping(target = "sellerSku", ignore = true)
    void updateVariant(ProductVariantRequest request, @MappingTarget ProductVariant variant);

}
