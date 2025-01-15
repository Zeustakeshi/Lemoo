/*
 *  ShippingAddressRepository
 *  @author: Minhhieuano
 *  @created 1/15/2025 10:09 AM
 * */


package com.lemoo.shipping.repository;

import com.lemoo.shipping.entity.ShippingAddress;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingAddressRepository extends MongoRepository<ShippingAddress, String> {

    boolean existsByUserId(String userId);

}
