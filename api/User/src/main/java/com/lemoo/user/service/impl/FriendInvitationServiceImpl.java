package com.lemoo.user.service.impl;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.FriendInvitation;
import com.lemoo.user.exception.BadRequestException;
import com.lemoo.user.exception.NotfoundException;
import com.lemoo.user.mapper.FriendInvitationMapper;
import com.lemoo.user.repository.FriendInvitationRepository;
import com.lemoo.user.service.FriendInvitationService;
import com.lemoo.user.service.FriendService;
import com.lemoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendInvitationServiceImpl implements FriendInvitationService {

	private final FriendInvitationRepository friendInvitationRepository;

	private final FriendInvitationMapper friendInvitationMapper;

	private final UserService userService;

	private final FriendService friendService;

	@Override
	public FriendInvitationResponse newFriendInvitation(
			AuthenticatedAccount account, NewFriendInvitationRequest request) {
		FriendInvitation invitation = FriendInvitation.builder()
				.senderId(account.getUserId())
				.receiverId(request.getTarget())
				.status(FriendInvitationStatus.PENDING)
				.build();
		System.out.println(invitation.getReceiverId());
		if (friendService.isExistingFriend(account.getUserId(), request.getTarget()))
			throw new BadRequestException("This Friend Relationship had been existed!");
		FriendInvitation friendInvitation = friendInvitationRepository.save(invitation);

		UserResponse user = userService.getUserProfile(account.getUserId());

//		friendProducer.newFriendRequest(NewFriendRequestEvent.builder()
//				.invitationId(friendInvitation.getId())
//				.receiverId(user.getId())
//				.senderAvatar(user.getAvatar())
//				.senderName(user.getDisplayName())
//				.build());

		return friendInvitationMapper.invitationToResponse(friendInvitation, user);
	}

	@Override
	public Page<FriendInvitationResponse> getCurrentFriendRequestList(String userId, int page, int limit) {

		Page<FriendInvitation> invitations = friendInvitationRepository.findByReceiverIdAndStatus(
				userId,
				FriendInvitationStatus.PENDING,
				PageRequest.of(page, limit, Sort.by("createdAt").descending()));

		return invitations.map(invitation -> {
			UserResponse userResponse = userService.getUserProfile(invitation.getSenderId());
			return friendInvitationMapper.invitationToResponse(invitation, userResponse);
		});
	}

	@Override
	public void acceptFriendRequest(String requestId) {

		FriendInvitation invitation = friendInvitationRepository
				.findById(requestId)
				.orElseThrow(() -> new NotfoundException("Friend not found!"));

		invitation.setStatus(FriendInvitationStatus.ACCEPTED);
		friendInvitationRepository.save(invitation);

		friendService.createFriend(invitation.getSenderId(), invitation.getReceiverId());
	}

	@Override
	public void rejectFriendRequest(String requestId) {

		FriendInvitation invitation = friendInvitationRepository
				.findById(requestId)
				.orElseThrow(() -> new NotfoundException("Friend Request not found!"));

		friendInvitationRepository.delete(invitation);
	}
}
