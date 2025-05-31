/*
 *  VoucherTransactionRepository
 *  @author: pc
 *  @created 4/21/2025 11:30 AM
 * */


package com.lemoo.promotion.repository;

import com.lemoo.promotion.entity.VoucherTransaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoucherTransactionRepository extends MongoRepository<VoucherTransaction, String> {

}
