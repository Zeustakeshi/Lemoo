/*
 *  CommentService
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:30 PM
 * */

package com.lemoo.video.service;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.CommentRequest;
import com.lemoo.video.dto.response.CommentResponse;
import com.lemoo.video.dto.response.PageableResponse;

public interface CommentService {
    CommentResponse createComment(CommentRequest request, String videoId, AuthenticatedAccount account);

    PageableResponse<CommentResponse> getAllComment(
            String parentId, int page, int limit, String videoId, AuthenticatedAccount account);

    boolean reactionComment(ReactionType type, String commentId, String videoId, AuthenticatedAccount account);

    boolean unReactionComment(String commentId, String videoId, AuthenticatedAccount account);

    boolean deleteComment(String commendId, String videoId, AuthenticatedAccount account);
}
