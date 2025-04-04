/*
 *  VIdeoRepositoty
 *  @author: Minhhieuano
 *  @created 12/17/2024 7:47 PM
 * */

package com.lemoo.video.repository;

import com.lemoo.video.common.enums.VideoStatus;
import com.lemoo.video.entity.Video;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {
	Optional<Video> findByIdAndChannelId(String id, String channelId);

	boolean existsByIdAndStatus(String id, VideoStatus status);

	Integer countByStatusAndChannelId(VideoStatus status, String channelId);

	Page<Video> findAllByStatusAndChannelId(VideoStatus status, String channelId, Pageable pageable);

	@Query("{ 'status': ?0, $or: [ { 'channelId': { $ne: ?1 } }, { 'channelId': { $exists: false } } ] }")
	Page<Video> findAllByStatusAndChannelIdNotLike(VideoStatus status, String channelId, Pageable pageable);

	Page<Video> findAllByChannelId(String channelId, Pageable pageable);

	Page<Video> findAllByChannelIdIn(List<String> channelIds, Pageable pageable);
}
