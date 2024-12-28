/*
 *  CitizenIdVerificationRepository
 *  @author: Minhhieuano
 *  @created 12/13/2024 8:16 PM
 * */

package com.lemoo.store.repository;

import com.lemoo.store.entity.CitizenIdVerification;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CitizenIdVerificationRepository extends JpaRepository<CitizenIdVerification, String> {
    Optional<CitizenIdVerification> findByStoreId(String storeId);

    @Modifying
    @Transactional
    @Query("update CitizenIdVerification c set c.documentBackSide = :documentUrl where c.store.id = :storeId")
    void updateDocumentBackSideByStoreId(String storeId, String documentUrl);

    @Modifying
    @Transactional
    @Query("update CitizenIdVerification c set c.documentFrontSide = :documentUrl where c.store.id = :storeId")
    void updateDocumentFrontSideByStoreId(String storeId, String documentUrl);
}
