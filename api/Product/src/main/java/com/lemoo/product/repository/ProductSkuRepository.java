/*
 *  ProductVariantRepository
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:11 PM
 * */

package com.lemoo.product.repository;

import com.lemoo.product.entity.ProductSku;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductSkuRepository extends MongoRepository<ProductSku, String> {
    List<ProductSku> findAllByProductId(String productId);
}
