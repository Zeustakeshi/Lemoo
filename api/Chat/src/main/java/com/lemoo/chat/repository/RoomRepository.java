/*
 *  RoomRepository
 *  @author: Minhhieuano
 *  @created 2/7/2025 3:57 PM
 * */

package com.lemoo.chat.repository;

import com.lemoo.chat.entity.Room;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends MongoRepository<Room, String> {

    @Query("{ 'members' : ?0 }")
    Page<Room> findAllByAccountInMember(String accountId, Pageable pageable);
}
