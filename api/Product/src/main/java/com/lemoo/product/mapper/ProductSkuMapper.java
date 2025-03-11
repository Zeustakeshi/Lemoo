/*
 *  ProductSkuMapper
 *  @author: Minhhieuano
 *  @created 1/5/2025 10:59 PM
 * */


package com.lemoo.product.mapper;

import com.lemoo.product.dto.response.InternalProductSkuResponse;
import com.lemoo.product.dto.response.ProductSkuResponse;
import com.lemoo.product.entity.ProductSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface ProductSkuMapper {

    @Mapping(target = "image", source = "sku.image.url")
    @Mapping(target = "lemooSku", source = "skuCode")
    @Mapping(target = "originPrice", source = "price")
    ProductSkuResponse toProductSkuResponse(ProductSku sku);

    @Mapping(target = "image", source = "sku.image.url")
    @Mapping(target = "stock", source = "sku.availableStock")
    InternalProductSkuResponse toInternalProductSkuResponse(ProductSku sku);

}
