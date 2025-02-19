/*
 *  GroupRoomServiceImpl
 *  @author: Minhhieuano
 *  @created 2/14/2025 5:20 PM
 * */


package com.lemoo.chat.service.impl;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.GroupRoomRequest;
import com.lemoo.chat.entity.GroupRoom;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.exception.NotfoundException;
import com.lemoo.chat.repository.RoomRepository;
import com.lemoo.chat.service.GroupRoomService;
import com.lemoo.chat.service.RoomValidatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class GroupRoomServiceImpl implements GroupRoomService {

    private final RoomValidatorService roomValidatorService;
    private final RoomRepository roomRepository;

    @Override
    public boolean createGroupRoom(GroupRoomRequest request, AuthenticatedAccount account) {
        Set<String> validMembers = roomValidatorService.validateMemberRequest(request.getMembers());
        validMembers.add(account.getUserId());

        roomRepository.save(GroupRoom.builder()
                .owner(account.getUserId())
                .members(validMembers)
                .build());
        return true;
    }

    @Override
    public boolean addUserToRoom(String inviteeId, String roomId, AuthenticatedAccount account) {

        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new NotfoundException("Room " + roomId + " not found!"));

        roomValidatorService.validateRoomAccessPermission(room, account.getUserId());
        
        if (room.getMembers().contains(inviteeId)) return false;

        room.getMembers().add(inviteeId);

        return true;
    }
}
