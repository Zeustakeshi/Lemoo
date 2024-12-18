/*
 *  VideoViewService
 *  @author: Minhhieuano
 *  @created 12/18/2024 3:05 PM
 * */

package com.lemoo.video.service;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.response.PageableResponse;
import com.lemoo.video.dto.response.ReactionResponse;
import com.lemoo.video.dto.response.VideoViewResponse;

public interface VideoViewService {
	PageableResponse<VideoViewResponse> getRecommendVideo(int page, int limit, AuthenticatedAccount account);

	PageableResponse<VideoViewResponse> getFollowingVideo(int page, int limit, AuthenticatedAccount account);

	ReactionResponse getVideoReaction(String videoId, AuthenticatedAccount account);

	boolean reactionVideo(ReactionType reactionType, String videoId, AuthenticatedAccount account);

	boolean unReactionVideo(String videoId, AuthenticatedAccount account);
}
