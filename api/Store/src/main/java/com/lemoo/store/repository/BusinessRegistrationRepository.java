/*
 *  BusinessRegistration
 *  @author: Minhhieuano
 *  @created 12/10/2024 9:25 PM
 * */


package com.lemoo.store.repository;

import com.lemoo.store.entity.BusinessRegistration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BusinessRegistrationRepository extends JpaRepository<BusinessRegistration, String> {
    Optional<BusinessRegistration> findByStoreId(String storeId);
}
