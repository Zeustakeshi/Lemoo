package com.lemoo.user.service.impl;

import com.lemoo.user.common.enums.FriendStatus;
import com.lemoo.user.dto.response.FriendResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.Friend;
import com.lemoo.user.event.eventModel.AcceptFriendRequestEvent;
import com.lemoo.user.event.producer.FriendProducer;
import com.lemoo.user.mapper.FriendMapper;
import com.lemoo.user.repository.FriendRepository;
import com.lemoo.user.service.FriendService;
import com.lemoo.user.service.UserService;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

	private final FriendRepository friendRepository;

	private final FriendMapper mapper;

	private final UserService userService;

	private final FriendProducer friendProducer;

	@Override
	public Page<FriendResponse> getCurrentFriendList(String userId, int page, int limit) {
		Page<Friend> friends = friendRepository.findAllByUserId(
				userId, PageRequest.of(page, limit, Sort.by("createdAt").descending()));

		return friends.map(friend -> {
			String friendUserId = userId.equals(friend.getUser1Id()) ? friend.getUser2Id() : friend.getUser1Id();

			UserResponse friendInfo = userService.getUserProfile(friendUserId);

			return mapper.friendToResponse(friend, friendInfo);
		});
	}

	@Override
	public void createFriend(String user1Id, String user2Id) {
		Friend friend = Friend.builder()
				.user1Id(user1Id)
				.user2Id(user2Id)
				.status(FriendStatus.ACCEPTED)
				.build();

		friendRepository.save(friend);
		UserResponse user = userService.getUserProfile(user1Id);

		friendProducer.acceptFriendRequest(AcceptFriendRequestEvent.builder()
				.senderId(user1Id)
				.receiverId(user.getId())
				.receiverAvatar(user.getAvatar())
				.receiverName(user.getDisplayName())
				.build());
	}

	@Override
	public Page<UserResponse> getRecommendFriendList(String userId, int page, int limit) {
		List<String> recommendFriends = friendRepository.findNonFriendUserIds(userId);

		List<UserResponse> friendResponses = new ArrayList<>();

		for (String recommendFriend : recommendFriends) {
			friendResponses.add(userService.getUserProfile(recommendFriend));
		}

		return new PageImpl<>(friendResponses, PageRequest.of(page, limit), recommendFriends.size());
	}

	@Override
	public boolean isExistingFriend(String user1Id, String user2Id) {
		return friendRepository.existsFriendByUser1IdAndUser2Id(user1Id, user2Id);
	}
}
