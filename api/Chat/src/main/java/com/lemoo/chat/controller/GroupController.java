/*
 *  GroupController
 *  @author: Minhhieuano
 *  @created 2/14/2025 5:05 PM
 * */


package com.lemoo.chat.controller;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.GroupRoomRequest;
import com.lemoo.chat.dto.response.ApiResponse;
import com.lemoo.chat.service.GroupRoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class GroupController {
    private final GroupRoomService groupRoomService;

    @PostMapping
    public ApiResponse<Boolean> createRoom(
            @RequestBody @Valid GroupRoomRequest request,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(groupRoomService.createGroupRoom(request, account));
    }

    @PostMapping("{roomId}")
    public ApiResponse<Boolean> addUserToGroup(
            @RequestParam("invitee") String inviteeId,
            @PathVariable("roomId") String roomId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(groupRoomService.addUserToRoom(inviteeId, roomId, account));
    }

}
