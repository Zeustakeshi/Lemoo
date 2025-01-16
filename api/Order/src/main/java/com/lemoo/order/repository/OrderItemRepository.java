/*
 *  OrderItemRepository
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:28 AM
 * */

package com.lemoo.order.repository;

import com.lemoo.order.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, String> {
    Set<OrderItem> findAllByOrderId(String orderId);
}
