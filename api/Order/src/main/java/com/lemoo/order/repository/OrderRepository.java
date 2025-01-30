/*
 *  OrderRepository
 *  @author: Minhhieuano
 *  @created 1/15/2025 11:27 AM
 * */

package com.lemoo.order.repository;

import com.lemoo.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends JpaRepository<Order, String> {
}
