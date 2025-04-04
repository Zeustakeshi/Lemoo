package com.lemoo.user.controller;

import com.lemoo.user.dto.common.AuthenticatedAccount;
import com.lemoo.user.dto.request.NewFriendInvitationRequest;
import com.lemoo.user.dto.request.UpdateFriendInvitationRequest;
import com.lemoo.user.dto.response.ApiResponse;
import com.lemoo.user.service.FriendInvitationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/friends")
public class FriendInvitationController {

    private final FriendInvitationService friendInvitationService;

    @PostMapping("/request")
    public ApiResponse<?> createFriendRequest(
            @AuthenticationPrincipal AuthenticatedAccount user,
            @RequestBody @Valid NewFriendInvitationRequest request) {
        return ApiResponse.success(friendInvitationService.newFriendInvitation(user, request));
    }

    @GetMapping("/request")
    public ApiResponse<?> getCurrentFriendRequest(
            @AuthenticationPrincipal AuthenticatedAccount user,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit) {
        return ApiResponse.success(friendInvitationService.getCurrentFriendRequestList(user.getUserId(), page, limit));
    }

    @PostMapping("/accept")
    public ApiResponse<?> acceptFriendRequest(
            @AuthenticationPrincipal AuthenticatedAccount user,
            @RequestBody @Valid UpdateFriendInvitationRequest request) {
        friendInvitationService.acceptFriendRequest(request.getSenderId(), user.getUserId());

        return ApiResponse.success("Accepted friend request");
    }

    @DeleteMapping("/reject")
    public ApiResponse<?> rejectFriendRequest(
            @AuthenticationPrincipal AuthenticatedAccount user,
            @RequestBody @Valid UpdateFriendInvitationRequest request) {
        friendInvitationService.rejectFriendRequest(user.getId(), request.getSenderId());
        return ApiResponse.success("Rejected friend request");
    }
}
