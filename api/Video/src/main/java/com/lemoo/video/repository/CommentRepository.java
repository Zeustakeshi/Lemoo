/*
 *  CommentRepository
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:50 PM
 * */

package com.lemoo.video.repository;

import com.lemoo.video.entity.Comment;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

	@Query("{ 'videoId': ?0, 'parentId': { $eq: ?1 } }")
	Page<Comment> findAllByVideoIdAndParentId(String videoId, String parentId, Pageable pageable);

	Optional<Comment> findByIdAndVideoId(String commentId, String videoId);

	boolean existsByIdAndVideoId(String commentId, String videoId);
}
