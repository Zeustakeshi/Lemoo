/*
 *  BankInfomationRepository
 *  @author: Minhhieuano
 *  @created 12/10/2024 9:06 PM
 * */

package com.lemoo.store.repository;

import com.lemoo.store.entity.BankInformation;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BankInformationRepository extends JpaRepository<BankInformation, String> {
	Optional<BankInformation> findByStoreId(String storeId);
}
