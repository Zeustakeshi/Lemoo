/*
 *  CitizenIdVerificationRepository
 *  @author: Minhhieuano
 *  @created 12/13/2024 8:16 PM
 * */

package com.lemoo.store.repository;

import com.lemoo.store.entity.CitizenIdVerification;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CitizenIdVerificationRepository extends JpaRepository<CitizenIdVerification, String> {
	Optional<CitizenIdVerification> findByStoreId(String storeId);
}
