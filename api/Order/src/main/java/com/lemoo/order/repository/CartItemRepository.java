/*
 *  CartItem
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:57 AM
 * */


package com.lemoo.order.repository;

import com.lemoo.order.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, String> {
    List<CartItem> findAllByCartId(String cartId);
}
