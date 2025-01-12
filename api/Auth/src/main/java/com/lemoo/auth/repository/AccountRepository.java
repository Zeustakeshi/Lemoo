/*
 *  AccountRepository
 *  @author: Minhhieuano
 *  @created 10/15/2024 10:19 PM
 * */

package com.lemoo.auth.repository;

import com.lemoo.auth.common.enums.Role;
import com.lemoo.auth.entity.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {

    @Query("select a from Account  a where  a.phone = :accountName or a.email = :accountName")
    Optional<Account> findByEmailOrPhone(String accountName);

    @Query("select a from Account a where a.email = :email and :role member of a.authorities")
    Optional<Account> findByEmailAndAuthority(String email, Role role);

    @Query("select count(a.id) > 0 from Account a where a.email = :email and :role member of a.authorities")
    boolean existsByEmailAndAuthority(String email, Role role);

    boolean existsByPhoneOrEmail(String phone, String email);
}
