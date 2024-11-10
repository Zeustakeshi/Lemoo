package com.lemoo.user.controller;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.FriendInvitationRequest;
import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.entity.User;
import com.lemoo.user.service.FriendInvitationService;
import com.lemoo.user.service.FriendService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("friends")
@RequiredArgsConstructor
public class FriendController {

    private final FriendService friendService;

    @GetMapping
    public ApiResponse<?> getCurrentFriendList(@AuthenticationPrincipal AuthenticatedAccount user,
                                               @RequestParam int page,
                                               @RequestParam int limit)
    {
        return ApiResponse.success(friendService.getCurrentFriendList(user.getId(),page,limit));
    }

//    @GetMapping("/recommend")
//    public ApiResponse<?> getRecommendFriendList(@AuthenticationPrincipal AuthenticatedAccount user,
//                                                 @RequestParam int page,
//                                                 @RequestParam int limit){
//        return ApiResponse.success((friendService.getRecommendFriendList(user.getUserId(),page,limit)));
//
//    }

}
