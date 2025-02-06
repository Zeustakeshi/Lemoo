package com.lemoo.user.service;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.dto.response.PageableResponse;

public interface FriendInvitationService {

	FriendInvitationResponse newFriendInvitation(AuthenticatedAccount user, NewFriendInvitationRequest request);

	PageableResponse<FriendInvitationResponse> getCurrentFriendRequestList(String userId, int page, int limit);

	void rejectFriendRequest(String senderId, String receiverId);

	void acceptFriendRequest(String senderId, String receiverId);

	public void acceptedFriend(String senderId, String receiverId);

	void receivedFriendRequest(String senderId, String receiverId);

	void notifyFriendRequest(String senderId, String receiverId);
}
