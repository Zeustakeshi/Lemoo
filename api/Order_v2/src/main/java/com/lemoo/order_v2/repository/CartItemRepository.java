/*
 *  CartItemRepository
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:39 PM
 * */

package com.lemoo.order_v2.repository;

import com.lemoo.order_v2.entity.CartItem;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemRepository extends MongoRepository<CartItem, String> {
	Optional<CartItem> findByUserIdAndSkuCode(String userId, String skuCode);
}
