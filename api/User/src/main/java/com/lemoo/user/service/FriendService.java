package com.lemoo.user.service;

import com.lemoo.user.dto.response.FriendResponse;
import com.lemoo.user.dto.response.PageableResponse;
import com.lemoo.user.dto.response.UserResponse;

public interface FriendService {

	PageableResponse<FriendResponse> getCurrentFriendList(String userId, int page, int limit);

	void createFriend(String user1Id, String user2Id);

	PageableResponse<UserResponse> getRecommendFriendList(String userId, int page, int limit);

	boolean isExistingFriend(String user1Id, String user2Id);
}
