/*
 *  VideoReactionRepository
 *  @author: Minhhieuano
 *  @created 12/18/2024 3:22 PM
 * */

package com.lemoo.video.repository;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.entity.VideoReaction;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VideoReactionRepository extends MongoRepository<VideoReaction, String> {
	Optional<VideoReaction> findByUserIdAndVideoId(String userId, String videoId);

	Long countByVideoIdAndType(String videoId, ReactionType type);
}
