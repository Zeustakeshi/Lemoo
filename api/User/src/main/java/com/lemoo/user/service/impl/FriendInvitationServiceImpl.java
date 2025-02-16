package com.lemoo.user.service.impl;

import com.lemoo.user.common.enums.FriendInvitationStatus;
import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.response.FriendInvitationResponse;
import com.lemoo.user.dto.response.PageableResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.FriendInvitation;
import com.lemoo.user.event.eventModel.*;
import com.lemoo.user.event.producer.FriendProducer;
import com.lemoo.user.event.producer.NotificationProducer;
import com.lemoo.user.event.producer.UserProducer;
import com.lemoo.user.exception.BadRequestException;
import com.lemoo.user.exception.NotfoundException;
import com.lemoo.user.mapper.FriendInvitationMapper;
import com.lemoo.user.mapper.PageMapper;
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
    private final UserProducer userProducer;
    private final FriendProducer friendProducer;
    private final NotificationProducer notificationProducer;
    private final PageMapper pageMapper;

    @Override
    public FriendInvitationResponse newFriendInvitation(
            AuthenticatedAccount account, NewFriendInvitationRequest request) {
        FriendInvitation invitation = FriendInvitation.builder()
                .senderId(account.getUserId())
                .receiverId(request.getTarget())
                .status(FriendInvitationStatus.PENDING)
                .build();
        if (friendService.isExistingFriend(account.getUserId(), request.getTarget()))
            throw new BadRequestException("This Friend Relationship had been existed!");
        FriendInvitation friendInvitation = friendInvitationRepository.save(invitation);

        UserResponse user = userService.getUserProfile(account.getUserId());

        friendProducer.friendRequest(FriendRequestEvent.builder()
                .senderId(friendInvitation.getSenderId())
                .receiverId(friendInvitation.getReceiverId())
                .build());


        return friendInvitationMapper.invitationToResponse(friendInvitation, user);
    }

    @Override
    public PageableResponse<FriendInvitationResponse> getCurrentFriendRequestList(String userId, int page, int limit) {

        Page<FriendInvitation> invitations = friendInvitationRepository.findByReceiverIdAndStatus(
                userId,
                FriendInvitationStatus.PENDING,
                PageRequest.of(page, limit, Sort.by("createdAt").descending()));

        return pageMapper.toPageableResponse(invitations.map(invitation -> {
            UserResponse userResponse = userService.getUserProfile(invitation.getSenderId());
            return friendInvitationMapper.invitationToResponse(invitation, userResponse);
        }));
    }

    @Override
    public void acceptFriendRequest(String senderId, String receiverId) {

        friendProducer.acceptFriend(AcceptFriendEvent.builder()
                .receiverId(receiverId)
                .senderId(senderId)
                .build());

    }

    public void acceptedFriend(String senderId, String receiverId) {
        FriendInvitation invitation = friendInvitationRepository
                .findFriendInvitationBySenderIdAndReceiverId(senderId, receiverId)
                .orElseThrow(() -> new NotfoundException("Friend not found!"));

        invitation.setStatus(FriendInvitationStatus.ACCEPTED);
        friendInvitationRepository.save(invitation);

        notificationProducer.notifyAcceptedFriend(NotifyAcceptFriendEvent.builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .build());

        friendService.createFriend(invitation.getSenderId(), invitation.getReceiverId());
    }

    @Override
    public void receivedFriendRequest(String senderId, String receiverId) {

        friendProducer.receivedFriend(ReceivedFriendRequestEvent.builder()
                .receiverId(receiverId)
                .senderId(senderId)
                .build());

    }

    @Override
    public void notifyFriendRequest(String senderId, String receiverId) {
        notificationProducer.notifyFriendRequest(NotifyFriendRequestEvent
                .builder()
                .senderId(senderId)
                .receiverId(receiverId)
                .build());
    }

    @Override
    public void rejectFriendRequest(String senderId, String receiverId) {

        FriendInvitation invitation = friendInvitationRepository
                .findFriendInvitationBySenderIdAndReceiverId(senderId, receiverId)
                .orElseThrow(() -> new NotfoundException("Friend not found!"));

        friendInvitationRepository.delete(invitation);

    }
}
