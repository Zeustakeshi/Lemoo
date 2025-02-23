/*
 *  VoucherRepository
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:50 PM
 * */

package com.lemoo.promotion.repository;

import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.entity.BaseVoucher;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BaseVoucherRepository extends MongoRepository<BaseVoucher, String> {
    Optional<BaseVoucher> findByNameAndStoreId(String name, String storeId);

    Optional<BaseVoucher> findByIdAndStoreId(String id, String storeId);

    Optional<BaseVoucher> findByIdAndStoreIdAndVoucherType(String id, String storeId, VoucherType voucherType);

    Optional<BaseVoucher> findByIdAndVoucherType(String voucherId, VoucherType type);

    boolean existsByNameAndStoreId(String name, String storeId);
}
