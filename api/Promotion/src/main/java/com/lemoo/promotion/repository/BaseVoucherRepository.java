/*
 *  VoucherRepository
 *  @author: Minhhieuano
 *  @created 12/27/2024 5:50 PM
 * */

package com.lemoo.promotion.repository;

import com.lemoo.promotion.common.enums.VoucherStatus;
import com.lemoo.promotion.common.enums.VoucherType;
import com.lemoo.promotion.entity.BaseVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface BaseVoucherRepository extends MongoRepository<BaseVoucher, String> {

    List<BaseVoucher> findAllByIdIn(Set<String> voucherIds);

    Optional<BaseVoucher> findByIdAndStoreId(String id, String storeId);

    Optional<BaseVoucher> findByIdAndStoreIdAndVoucherType(String id, String storeId, VoucherType voucherType);

    Page<BaseVoucher> findAllByStoreIdAndVoucherType(String storeId, VoucherType type, Pageable pageable);

    Page<BaseVoucher> findAllByStoreIdAndStatus(String storeId, VoucherStatus status, Pageable pageable);

}
