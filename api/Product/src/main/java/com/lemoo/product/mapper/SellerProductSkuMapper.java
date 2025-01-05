/*
 *  ProductSkuMapper
 *  @author: Minhhieuano
 *  @created 12/29/2024 12:47 PM
 * */


package com.lemoo.product.mapper;

import com.lemoo.product.dto.common.ProductSkuHashCache;
import com.lemoo.product.dto.response.ProductSkuSimpleResponse;
import com.lemoo.product.dto.response.SellerProductSkuResponse;
import com.lemoo.product.entity.ProductSku;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper
public interface SellerProductSkuMapper {

    @Mapping(target = "lemooSku", source = "skuCode")
    ProductSkuSimpleResponse toProductSkuSimpleResponse(ProductSku productSku);

    @Mapping(target = "image", source = "sku.image.url")
    ProductSkuHashCache toProductSkuCache(ProductSku sku);

    @Mapping(target = "lemooSku", source = "skuCode")
    SellerProductSkuResponse toSkuResponse(ProductSku variant);

}
