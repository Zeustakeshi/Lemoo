package com.lemoo.user.service;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.response.FriendInvitationResponse;
import org.springframework.data.domain.Page;

public interface FriendInvitationService {

	FriendInvitationResponse newFriendInvitation(AuthenticatedAccount user, NewFriendInvitationRequest request);

	Page<FriendInvitationResponse> getCurrentFriendRequestList(String userId, int page, int limit);

	void rejectFriendRequest(String requestId);

	void acceptFriendRequest(String requestId);
}
