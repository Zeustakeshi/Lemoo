/*
 *  ShippingAddressRepository
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:09 AM
 * */


package com.lemoo.shipping.repository;

import com.lemoo.shipping.entity.ShippingAddress;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShippingAddressRepository extends MongoRepository<ShippingAddress, String> {

    boolean existsByUserId(String userId);

    Optional<ShippingAddress> findByUserId(String userId);

    List<ShippingAddress> findAllByUserId(String userId);

    Page<ShippingAddress> findAllByUserId(String userId, Pageable pageable);

    Optional<ShippingAddress> findByIdAndUserId(String id, String userId);

    Optional<ShippingAddress> findByUserIdAndIsDefault(String userId, Boolean isDefault);
}
