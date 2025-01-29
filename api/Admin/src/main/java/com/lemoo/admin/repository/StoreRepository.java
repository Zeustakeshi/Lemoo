/*
 *  PendingStoreRepository
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:10 PM
 * */


package com.lemoo.admin.repository;

import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.entity.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, String> {
    Optional<Store> findByStoreId(String storeId);

    Optional<Store> findByAccountId(String accountId);

    Optional<Store> findByIdAndStatus(String storeId, StoreStatus status);

    Page<Store> findAllByStatus(StoreStatus status, Pageable pageable);
}
