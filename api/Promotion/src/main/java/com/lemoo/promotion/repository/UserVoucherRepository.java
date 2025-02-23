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

@Repository
public interface UserVoucherRepository extends MongoRepository<CollectedVoucher, String> {
    Page<CollectedVoucher> findAllByUserId(String userId, Pageable pageable);

    boolean existsByUserIdAndVoucherId(String userId, String voucherId);
}
