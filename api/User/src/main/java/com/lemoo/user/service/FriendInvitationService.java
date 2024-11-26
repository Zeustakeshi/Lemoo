package com.lemoo.user.service;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.dto.response.PageableResponse;

public interface FriendInvitationService {

	FriendInvitationResponse newFriendInvitation(AuthenticatedAccount user, NewFriendInvitationRequest request);

	PageableResponse<FriendInvitationResponse> getCurrentFriendRequestList(String userId, int page, int limit);

	void rejectFriendRequest(String requestId);

	void acceptFriendRequest(String requestId);
}
