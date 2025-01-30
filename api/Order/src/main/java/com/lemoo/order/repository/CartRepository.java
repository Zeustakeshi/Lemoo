/*
 *  CartRepository
 *  @author: Minhhieuano
 *  @created 1/25/2025 10:56 AM
 * */


package com.lemoo.order.repository;

import com.lemoo.order.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, String> {
    boolean existsByUserId(String userId);

    Optional<Cart> findByUserId(String userId);
}
