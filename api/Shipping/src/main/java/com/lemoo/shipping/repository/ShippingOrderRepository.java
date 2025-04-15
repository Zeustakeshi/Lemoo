/*
 *  ShippingOrderRepository
 *  @author: pc
 *  @created 4/15/2025 12:09 AM
 * */

package com.lemoo.shipping.repository;

import com.lemoo.shipping.entity.ShippingOrder;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ShippingOrderRepository extends MongoRepository<ShippingOrder, String> {
    Optional<ShippingOrder> findByOrderIdAndUserId(String orderId, String userId);

    boolean existsByOrderIdAndUserId(String orderId, String userId);
}
