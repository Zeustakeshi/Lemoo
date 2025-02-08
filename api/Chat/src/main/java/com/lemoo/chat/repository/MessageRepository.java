/*
 *  MessageRepository
 *  @author: Minhhieuano
 *  @created 2/8/2025 9:57 AM
 * */

package com.lemoo.chat.repository;

import com.lemoo.chat.entity.Message;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MessageRepository extends MongoRepository<Message, String> {
    
}
