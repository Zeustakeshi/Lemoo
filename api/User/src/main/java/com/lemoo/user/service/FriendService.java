package com.lemoo.user.service;

import com.lemoo.user.dto.response.FriendResponse;
import com.lemoo.user.entity.User;
import org.springframework.data.domain.Page;

public interface FriendService {

    Page<FriendResponse> getCurrentFriendList(String userId, int page, int limit);

    void createFriend(String user1Id,String user2Id);

//    Page<FriendResponse> getRecommendFriendList(String userId, int page, int limit);
}
