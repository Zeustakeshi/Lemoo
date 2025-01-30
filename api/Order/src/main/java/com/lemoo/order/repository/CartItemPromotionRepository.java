/*
 *  CartItemPromotionRepository
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:58 AM
 * */

package com.lemoo.order.repository;

import com.lemoo.order.entity.CartItemPromotion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartItemPromotionRepository extends JpaRepository<CartItemPromotion, String> {
}
