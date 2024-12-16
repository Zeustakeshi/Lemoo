/*
 *  ChannelRepository
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:09 AM
 * */


package com.lemoo.video.repository;

import com.lemoo.video.entity.Channel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ChannelRepository extends MongoRepository<Channel, String> {

    @Query(value = "{ 'status': 'ACTIVE', 'userId': ?0 }")
    Optional<Channel> findByUserId(String userId);

    @Query(value = "{ 'status': 'ACTIVE', '_id': ?0 }")
    Optional<Channel> findByActiveChannelById(String channelId);

    @Query(value = "{ 'status': 'ACTIVE', 'userId': ?0 }")
    Optional<Channel> findByActiveChannelByUserId(String userId);

    @Query(value = "{ 'status': 'ACTIVE', '_id': ?0 }", exists = true)
    boolean isActiveChannelExisted(String channelId);

    boolean existsByUserId(String userId);

    boolean existsByName(String name);


}
