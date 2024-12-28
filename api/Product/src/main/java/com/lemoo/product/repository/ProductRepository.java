/*
 *  ProductRepository
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:02 AM
 * */

package com.lemoo.product.repository;

import com.lemoo.product.entity.Product;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
	boolean existsByNameAndStoreId(String name, String storeId);

	@Query(value = "{ 'status': 'DRAFT', 'storeId': ?0 }", count = true)
	long countDraftProducts(String storeId);

	Optional<Product> findByIdAndStoreId(String id, String storeId);

	Page<Product> findAllByStoreId(String storeId, Pageable pageable);
}
