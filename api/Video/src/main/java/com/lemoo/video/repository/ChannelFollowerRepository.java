/*
 *  ChannelFollowerRespository
 *  @author: Minhhieuano
 *  @created 12/17/2024 1:20 AM
 * */

package com.lemoo.video.repository;

import com.lemoo.video.entity.ChannelFollower;
import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChannelFollowerRepository extends MongoRepository<ChannelFollower, String> {
	Long countByChannelId(String channelId);

	Long countByUserId(String userId);

	List<ChannelFollower> findAllByUserId(String userId);

	boolean existsByChannelIdAndUserId(String channelId, String userId);

	Optional<ChannelFollower> findByChannelIdAndUserId(String channelId, String userId);
}
