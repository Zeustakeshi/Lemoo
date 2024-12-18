/*
 *  StoreRepository
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:27 PM
 * */

package com.lemoo.store.repository;

import com.lemoo.store.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, String> {
    Optional<Store> findByOwnerId(String ownerId);

    @Query("select s from Store s where  s.status != 'INACTIVE' and s.ownerId == :ownerId")
    Optional<Store> findVerifiedStore(String ownerId);

    boolean existsByName(String name);

    boolean existsByNameOrOwnerId(String name, String ownerId);
}
