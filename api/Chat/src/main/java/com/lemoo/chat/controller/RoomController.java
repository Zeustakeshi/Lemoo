/*
 *  RoomController
 *  @author: Minhhieuano
 *  @created 2/6/2025 1:19 AM
 * */

package com.lemoo.chat.controller;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.RoomRequest;
import com.lemoo.chat.dto.response.ApiResponse;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.dto.response.RoomDetailResponse;
import com.lemoo.chat.dto.response.RoomResponse;
import com.lemoo.chat.service.RoomService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomService roomService;

    @PostMapping
    public ApiResponse<Boolean> createChatRoom(
            @AuthenticationPrincipal AuthenticatedAccount account, @RequestBody @Valid RoomRequest request) {
        return ApiResponse.success(roomService.createRoom(account, request));
    }

    @GetMapping
    public ApiResponse<PageableResponse<RoomResponse>> getAllRooms(
            @AuthenticationPrincipal AuthenticatedAccount account,
            @RequestParam(required = false, name = "page", defaultValue = "0") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "10") int limit) {
        return ApiResponse.success(roomService.getAllRoom(page, limit, account));
    }

    @GetMapping("{roomId}")
    public ApiResponse<RoomDetailResponse> getRoomDetail(
            @PathVariable("roomId") String roomId,
            @AuthenticationPrincipal AuthenticatedAccount account
    ) {
        return ApiResponse.success(roomService.getRoomDetail(roomId, account));
    }
}
