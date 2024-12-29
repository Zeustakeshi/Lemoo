/*
 *  ProductSkuMapper
 *  @author: Minhhieuano
 *  @created 12/29/2024 12:47 PM
 * */


package com.lemoo.product.mapper;

import com.lemoo.product.dto.response.ProductSkuSimpleResponse;
import com.lemoo.product.entity.ProductSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProductSkuMapper {

    @Mapping(target = "lemooSku", source = "skuCode")
    ProductSkuSimpleResponse productSkuToProductSkuSimpleResponse(ProductSku productSku);
}
