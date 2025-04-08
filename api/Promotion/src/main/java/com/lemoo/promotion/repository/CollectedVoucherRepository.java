/*
 *  UserVoucherRepository
 *  @author: Minhhieuano
 *  @created 1/19/2025 5:42 PM
 * */

package com.lemoo.promotion.repository;

import com.lemoo.promotion.entity.CollectedVoucher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Repository
public interface CollectedVoucherRepository extends MongoRepository<CollectedVoucher, String> {
    Page<CollectedVoucher> findAllByUserId(String userId, Pageable pageable);

    Optional<CollectedVoucher> findByUserIdAndVoucherId(String userId, String voucherId);

    boolean existsByUserIdAndVoucherId(String userId, String voucherId);

    List<CollectedVoucher> findAllByUserIdAndVoucherIdIn(String userId, Set<String> voucherIds);
}
