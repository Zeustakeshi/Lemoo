/*
 *  UserRepository
 *  @author: Minhhieuano
 *  @created 10/29/2024 2:28 PM
 * */

package com.lemoo.user.repository;

import com.lemoo.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
    Set<User> findByIdIn(Set<String> ids);
}
