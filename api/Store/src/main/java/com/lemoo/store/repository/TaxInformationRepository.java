/*
 *  TaxInformationRepository
 *  @author: Minhhieuano
 *  @created 12/13/2024 8:17 PM
 * */

package com.lemoo.store.repository;

import com.lemoo.store.entity.TaxInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TaxInformationRepository extends JpaRepository<TaxInformation, String> {
    Optional<TaxInformation> findByStoreId(String storeId);

    @Modifying
    @Transactional
    @Query("update TaxInformation t set t.document = :documentUrl where t.store.id = :storeId")
    void updateDocumentByStoreId(String storeId, String documentUrl);
}
