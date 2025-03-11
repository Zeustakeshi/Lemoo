/*
 *  OrderRepository
 *  @author: Minhhieuano
 *  @created 3/11/2025 1:34 AM
 * */


package com.lemoo.order_v2.repository;

import com.lemoo.order_v2.entity.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
}
