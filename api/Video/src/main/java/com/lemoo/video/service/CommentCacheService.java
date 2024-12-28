/*
 *  CommentCacheService
 *  @author: Minhhieuano
 *  @created 12/24/2024 12:28 AM
 * */

package com.lemoo.video.service;

import com.lemoo.video.entity.Comment;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CommentCacheService {

	Page<Comment> getCommentByParentId(String parentId, Pageable pageable);

	List<Comment> getCommentByListId(List<String> commentIds);

	void saveComment(Comment comment, String parentId);

	boolean existChildren(String parentId);
}
