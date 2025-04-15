/*
 *  CartItemRepository
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:39 PM
 * */

package com.lemoo.order_v2.repository;

import com.lemoo.order_v2.entity.CartItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface CartItemRepository extends MongoRepository<CartItem, String> {
    Optional<CartItem> findByIdAndUserId(String id, String userId);

    Optional<CartItem> findByUserIdAndSkuCode(String userId, String skuCode);

    Set<CartItem> findByUserIdAndSkuCodeIn(String userId, Set<String> skuCodes);

    Page<CartItem> findAllByUserId(String userId, Pageable pageable);
}
