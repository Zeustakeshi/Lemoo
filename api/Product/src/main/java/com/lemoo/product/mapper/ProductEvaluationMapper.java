/*
 *  ProductEvalutionMapper
 *  @author: Minhhieuano
 *  @created 3/12/2025 12:59 AM
 * */


package com.lemoo.product.mapper;

import com.lemoo.product.domain.ProductSkuEvaluation;
import com.lemoo.product.entity.Product;
import com.lemoo.product.entity.ProductSku;
import com.lemoo.product.event.eventModel.ProductEvaluationEvent;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Mapper
public interface ProductEvaluationMapper {
    ProductSkuEvaluation toProductSkuEvaluation(ProductSku sku);

    default ProductEvaluationEvent toProductEvaluationEvent(Product product, String categoryName, List<ProductSku> productSkus) {
        var productEvaluationEvent = ProductEvaluationEvent.builder()
                .productId(product.getId())
                .description(product.getDescription())
                .name(product.getName())
                .build();

        Set<ProductSkuEvaluation> skuEvaluations = productSkus.stream()
                .map(this::toProductSkuEvaluation)
                .collect(Collectors.toSet());

        productEvaluationEvent.setSkus(skuEvaluations);
        productEvaluationEvent.setCategories(categoryName);
        return productEvaluationEvent;
    }
}
