/*
 *  CommentCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 12/24/2024 12:29 AM
 * */

package com.lemoo.video.service.impl;

import com.lemoo.video.entity.Comment;
import com.lemoo.video.service.CommentCacheService;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.Pipeline;

@Service
@RequiredArgsConstructor
public class CommentCacheServiceImpl implements CommentCacheService {

	private final Jedis jedis;

	@Override
	public boolean existChildren(String parentId) {
		String replyKey = "comment:children:" + parentId;
		return jedis.exists(replyKey);
	}

	@Override
	public Page<Comment> getCommentByParentId(String parentId, Pageable pageable) {
		String setKey = "comment:children:" + parentId;

		long len = jedis.zcard(setKey);
		int start = (int) pageable.getOffset();
		int end = Math.min(start + pageable.getPageSize() - 1, (int) len - 1);

		List<String> commentIds = jedis.zrevrange(setKey, start, end);

		List<Comment> comments = getCommentByListId(commentIds);

		return new PageImpl<>(comments, pageable, len);
	}

	@Override
	public List<Comment> getCommentByListId(List<String> commentIds) {
		Pipeline pipeline = jedis.pipelined();
		List<Object> responses;

		for (var commentId : commentIds) {
			String commentHashKey = "comment:" + commentId;
			pipeline.hmget(commentHashKey, "id", "content", "userId", "createdAt");
		}

		responses = pipeline.syncAndReturnAll();

		List<Comment> comments = new ArrayList<>();

		for (Object response : responses) {
			if (response instanceof List) {
				@SuppressWarnings("unchecked")
				List<String> commentData = (List<String>) response;

				try {
					String id = commentData.get(0);
					String content = commentData.get(1);
					String userId = commentData.get(2);
					String createdAtStr = commentData.get(3);

					LocalDateTime createdAt = null;
					if (createdAtStr != null) {
						createdAt = LocalDateTime.parse(createdAtStr, DateTimeFormatter.ISO_DATE_TIME);
					}

					Comment comment = Comment.builder()
							.id(id)
							.content(content)
							.userId(userId)
							.createdAt(createdAt)
							.build();
					comments.add(comment);
				} catch (Exception e) {
					System.err.println("Error parsing comment data: " + e.getMessage());
				}
			}
		}

		return comments;
	}

	@Override
	public void saveComment(Comment comment, String parentId) {
		Pipeline pipeline = jedis.pipelined();

		String replyKey = "comment:children:" + parentId;
		String commentHashKey = "comment:" + comment.getId();

		String createdAtStr = comment.getCreatedAt().format(DateTimeFormatter.ISO_DATE_TIME);

		long epochMilli = comment.getCreatedAt().toInstant(ZoneOffset.UTC).toEpochMilli();

		pipeline.zadd(replyKey, epochMilli, comment.getId());

		pipeline.hmset(
				commentHashKey,
				Map.of(
						"id", comment.getId(),
						"content", comment.getContent(),
						"userId", comment.getUserId(),
						"createdAt", createdAtStr));

		pipeline.sync();
	}
}
