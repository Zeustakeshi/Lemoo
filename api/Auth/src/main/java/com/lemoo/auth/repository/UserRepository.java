/*
 *  UserRepository
 *  @author: Minhhieuano
 *  @created 10/27/2024 11:17 AM
 * */

package com.lemoo.auth.repository;

import com.lemoo.auth.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByAccountId(String accountId);
}
