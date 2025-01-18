/*
 *  ProductRepository
 *  @author: Minhhieuano
 *  @created 12/14/2024 1:02 AM
 * */

package com.lemoo.product.repository;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {
    boolean existsByNameAndStoreId(String name, String storeId);

    @Query(value = "{ 'status': 'DRAFT', 'storeId': ?0 }", count = true)
    long countDraftProducts(String storeId);

    Optional<Product> findByIdAndStatus(String productId, ProductStatus status);

    Optional<Product> findByIdAndStoreId(String id, String storeId);

    Page<Product> findAllByStoreId(String storeId, Pageable pageable);

    @Query(value = "{ '_id': { '$in': ?0 }, 'status': 'LIVE' }", count = true)
    long countActiveProducts(Set<String> productIds);
}
