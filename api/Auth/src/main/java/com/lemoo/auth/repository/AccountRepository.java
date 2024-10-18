/*
 *  AccountRepository
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:19 PM
 * */

package com.lemoo.auth.repository;

import com.lemoo.auth.entity.Account;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

	@Query("select a from Account  a where  a.phone = :accountName or a.email = :accountName")
	Optional<Account> findByEmailOrPhone(String accountName);

	boolean existsByPhoneOrEmail(String phone, String email);
}
