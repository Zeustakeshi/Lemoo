/*
 *  UserRepository
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:28 PM
 * */

package com.lemoo.user.repository;

import com.lemoo.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
}
