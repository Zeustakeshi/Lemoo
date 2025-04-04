/*
 *  CartItemSkuRepository
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:58 AM
 * */

package com.lemoo.order.repository;

import com.lemoo.order.entity.CartItemSku;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemSkuRepository extends JpaRepository<CartItemSku, String> {
    List<CartItemSku> findAllByCartItemId(String cartItemId);
}
