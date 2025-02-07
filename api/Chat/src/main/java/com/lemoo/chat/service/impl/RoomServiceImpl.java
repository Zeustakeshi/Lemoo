/*
 *  RoomServiceImpl
 *  @author: Minhhieuano
 *  @created 2/7/2025 3:56 PM
 * */

package com.lemoo.chat.service.impl;

import com.lemoo.chat.common.enums.RoomType;
import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.RoomRequest;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.dto.response.RoomResponse;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.entity.SingleRoom;
import com.lemoo.chat.mapper.PageMapper;
import com.lemoo.chat.mapper.RoomMapper;
import com.lemoo.chat.repository.RoomRepository;
import com.lemoo.chat.service.RoomService;
import com.lemoo.chat.service.RoomValidatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;
    private final RoomValidatorService roomValidatorService;
    private final RoomMapper roomMapper;
    private final PageMapper pageMapper;

    @Override
    public boolean createRoom(AuthenticatedAccount account, RoomRequest request) {
        Set<String> validMembers = roomValidatorService.validateMemberRequest(request.getMembers());
        validMembers.add(account.getUserId());

        Room room =
                SingleRoom.builder().members(validMembers).type(RoomType.SINGLE).build();

        roomRepository.save(room);

        return true;
    }

    @Override
    public PageableResponse<RoomResponse> getAllRoom(int page, int limit, AuthenticatedAccount account) {
        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Room> rooms = roomRepository.findAllByAccountInMember(account.getUserId(), request);

        Page<RoomResponse> responses = rooms.map(
                room -> CompletableFuture.supplyAsync(() -> roomMapper.toRoomResponse(room, account.getUserId()))
        ).map(CompletableFuture::join);
        return pageMapper.toPageableResponse(responses);
    }
}
