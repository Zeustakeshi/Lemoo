/*
 *  OrderRepository
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:34 AM
 * */


package com.lemoo.order_v2.repository;

import com.lemoo.order_v2.common.enums.OrderStatus;
import com.lemoo.order_v2.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    Page<Order> findAllByUserId(String userId, Pageable pageable);

    Page<Order> findAllByStoreIdAndStatus(String storeId, OrderStatus status, Pageable pageable);

    Optional<Order> findByIdAndUserId(String orderId, String userId);

}
