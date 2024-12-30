/*
 *  VoucherRepository
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:50 PM
 * */

package com.lemoo.promotion.repository;

import com.lemoo.promotion.entity.SellerVoucher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoucherRepository extends MongoRepository<SellerVoucher, String> {
    Optional<SellerVoucher> findByNameAndStoreId(String name, String storeId);

    boolean existsByNameAndStoreId(String name, String storeId);
}
