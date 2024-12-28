/*
 *  ProductVariantRepository
 *  @author: Minhhieuano
 *  @created 12/14/2024 2:11 PM
 * */

package com.lemoo.product.repository;

import com.lemoo.product.entity.ProductVariant;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductVariantRepository extends MongoRepository<ProductVariant, String> {
	List<ProductVariant> findAllByProductId(String productId);
}
