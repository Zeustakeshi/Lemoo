/*
 *  ProductMapper
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:59 PM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.response.ProductDetailResponse;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductMedia;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProductMapper {

    @Mapping(target = "skus", ignore = true)
    ProductDetailResponse toProductDetailResponse(Product product);


    default String mapMediaToString(ProductMedia media) {
        return media != null ? media.getUrl() : null;
    }
}
