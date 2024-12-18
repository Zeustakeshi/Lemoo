/*
 *  CommentReactionRepository
 *  @author: Minhhieuano
 *  @created 12/18/2024 8:17 PM
 * */


package com.lemoo.video.repository;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.entity.CommentReaction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CommentReactionRepository extends MongoRepository<CommentReaction, String> {
    Optional<CommentReaction> findByCommentIdAndUserId(String commentId, String userId);

    Long countByCommentIdAndType(String commentId, ReactionType type);

    boolean existsByCommentIdAndUserId(String commentId, String userId);
}
