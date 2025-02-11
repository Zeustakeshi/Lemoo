package com.lemoo.user.service.impl;

import com.lemoo.user.dto.response.FriendResponse;
import com.lemoo.user.dto.response.PageableResponse;
import com.lemoo.user.dto.response.UserResponse;
import com.lemoo.user.entity.Friend;
import com.lemoo.user.event.eventModel.FriendCreatedEvent;
import com.lemoo.user.event.producer.ChatProducer;
import com.lemoo.user.mapper.FriendMapper;
import com.lemoo.user.mapper.PageMapper;
import com.lemoo.user.repository.FriendRepository;
import com.lemoo.user.service.FriendService;
import com.lemoo.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final FriendMapper mapper;
    private final PageMapper pageMapper;
    private final UserService userService;
    private final ChatProducer chatProducer;

    @Override
    public PageableResponse<FriendResponse> getCurrentFriendList(String userId, int page, int limit) {
        Page<Friend> friends = friendRepository.findAllByUserId(
                userId, PageRequest.of(page, limit, Sort.by("createdAt").descending()));

        return pageMapper.toPageableResponse(friends.map(friend -> {
            String friendUserId = userId.equals(friend.getUser1Id()) ? friend.getUser2Id() : friend.getUser1Id();

            UserResponse friendInfo = userService.getUserProfile(friendUserId);

            return mapper.friendToResponse(friend, friendInfo);
        }));
    }

    @Override
    public void createFriend(String user1Id, String user2Id) {
        Friend friend = friendRepository.save(Friend.builder()
                .user1Id(user1Id)
                .user2Id(user2Id)
                .build());

        chatProducer.createChatRoom(FriendCreatedEvent.builder()
                .friendId(friend.getId())
                .user1Id(friend.getUser1Id())
                .user2Id(friend.getUser2Id())
                .build());
    }

    @Override
    public PageableResponse<UserResponse> getRecommendFriendList(String userId, int page, int limit) {
        Page<String> recommendFriends = friendRepository.findNonFriendUserIds(userId, PageRequest.of(page, limit));
        Page<UserResponse> recommendFriendResponses = recommendFriends.map(userService::getUserProfile);

        return pageMapper.toPageableResponse(recommendFriendResponses);
    }

    @Override
    public boolean isExistingFriend(String user1Id, String user2Id) {
        return friendRepository.existsFriendByUser1IdAndUser2Id(user1Id, user2Id);
    }
}
