/*
 *  CommentServiceImpl
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:49 PM
 * */

package com.lemoo.video.service.impl;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.common.enums.VideoStatus;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.CommentRequest;
import com.lemoo.video.dto.response.CommentResponse;
import com.lemoo.video.dto.response.PageableResponse;
import com.lemoo.video.dto.response.ReactionResponse;
import com.lemoo.video.entity.Comment;
import com.lemoo.video.entity.CommentReaction;
import com.lemoo.video.exception.NotfoundException;
import com.lemoo.video.mapper.CommentMapper;
import com.lemoo.video.mapper.PageMapper;
import com.lemoo.video.repository.CommentReactionRepository;
import com.lemoo.video.repository.CommentRepository;
import com.lemoo.video.repository.VideoRepository;
import com.lemoo.video.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

	private final CommentRepository commentRepository;
	private final VideoRepository videoRepository;
	private final CommentMapper commentMapper;
	private final PageMapper pageMapper;
	private final CommentReactionRepository commentReactionRepository;

	@Override
	@Transactional
	public CommentResponse createComment(CommentRequest request, String videoId, AuthenticatedAccount account) {
		if (!videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC)) {
			throw new NotfoundException("Video " + videoId + " not found");
		}

		Comment comment = Comment.builder()
				.videoId(videoId)
				.content(request.getContent())
				.userId(account.getUserId())
				.build();

		// update parent comment
		if (request.getParent() != null) {
			Comment parentComment = commentRepository
					.findById(request.getParent())
					.orElseThrow(() -> new NotfoundException("Comment parent not found"));
			comment.setParentId(parentComment.getId());
			parentComment.setReplyCount(parentComment.getReplyCount() + 1);
			commentRepository.save(parentComment);
		}

		CommentResponse response = commentMapper.toCommentResponse(commentRepository.save(comment));

		response.setReaction(ReactionResponse.builder().build());

		return response;
	}

	@Override
	public PageableResponse<CommentResponse> getAllComment(
			String parentId, int page, int limit, String videoId, AuthenticatedAccount account) {

		if (!videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC)) {
			throw new NotfoundException("Video " + videoId + " not found");
		}

		PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.ASC, "createdAt"));

		Page<Comment> comments = commentRepository.findAllByVideoIdAndParentId(videoId, parentId, request);

		Page<CommentResponse> commentResponses = comments.map(comment -> {
			CommentResponse response = commentMapper.toCommentResponse(comment);

			ReactionResponse reactionResponse = ReactionResponse.builder()
					.like(commentReactionRepository.countByCommentIdAndType(comment.getId(), ReactionType.LIKE))
					.dislike(commentReactionRepository.countByCommentIdAndType(comment.getId(), ReactionType.DISLIKE))
					.build();

			commentReactionRepository
					.findByCommentIdAndUserId(comment.getId(), account.getUserId())
					.ifPresent((reaction) -> {
						reactionResponse.setLiked(reaction.getType().equals(ReactionType.LIKE));
						reactionResponse.setDisliked(reaction.getType().equals(ReactionType.DISLIKE));
					});

			response.setReaction(reactionResponse);
			return response;
		});

		return pageMapper.toPageableResponse(commentResponses);
	}

	@Override
	@Transactional
	public boolean reactionComment(ReactionType type, String commentId, String videoId, AuthenticatedAccount account) {

		Comment comment = commentRepository
				.findByIdAndVideoId(commentId, videoId)
				.orElseThrow(() -> new NotfoundException("Comment " + commentId + " not found"));

		var commentReactionOptional =
				commentReactionRepository.findByCommentIdAndUserId(commentId, account.getUserId());

		CommentReaction commentReaction;

		if (commentReactionOptional.isPresent()) {
			commentReaction = commentReactionOptional.get();

			if (commentReaction.getType().equals(type)) return false;
			commentReaction.setType(type);

		} else {
			commentReaction = CommentReaction.builder()
					.commentId(commentId)
					.type(type)
					.userId(account.getUserId())
					.build();
		}

		commentReactionRepository.save(commentReaction);

		return true;
	}

	@Override
	@Transactional
	public boolean unReactionComment(String commentId, String videoId, AuthenticatedAccount account) {

		if (!commentRepository.existsByIdAndVideoId(commentId, videoId)) {
			throw new NotfoundException("Comment " + commentId + " not found");
		}

		var commentReactionOptional =
				commentReactionRepository.findByCommentIdAndUserId(commentId, account.getUserId());

		if (commentReactionOptional.isEmpty()) return false;

		CommentReaction commentReaction = commentReactionOptional.get();

		commentReactionRepository.delete(commentReaction);

		return true;
	}

	@Override
	public boolean deleteComment(String commendId, String videoId, AuthenticatedAccount account) {
		return false;
	}
}
