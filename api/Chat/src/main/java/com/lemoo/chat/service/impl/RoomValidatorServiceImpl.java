/*
 *  RoomValidatorServiceImpl
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:16 PM
 * */

package com.lemoo.chat.service.impl;

import com.lemoo.chat.client.UserClient;
import com.lemoo.chat.dto.request.BatchFetchUserInfoRequest;
import com.lemoo.chat.entity.Room;
import com.lemoo.chat.exception.ForbiddenException;
import com.lemoo.chat.exception.InternalServerErrorException;
import com.lemoo.chat.service.RoomValidatorService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class RoomValidatorServiceImpl implements RoomValidatorService {
    private final UserClient userClient;

    @Override
    public Set<String> validateMemberRequest(Set<String> members) {

        var batchFetchUserResponse = userClient.batchFetchUserInfo(
                BatchFetchUserInfoRequest.builder().users(members).build());

        if (batchFetchUserResponse.getErrors() != null) {
            throw new InternalServerErrorException(
                    batchFetchUserResponse.getErrors().toString());
        }
        var users = batchFetchUserResponse.getData();
        Set<String> validMembers = new HashSet<>();

        for (var member : members) {
            if (users.stream().noneMatch(user -> user.getId().equals(member))) continue;
            validMembers.add(member);
        }

        return validMembers;
    }

    @Override
    public void validateRoomAccessPermission(Room room, String memberId) {
        if (!room.getMembers().contains(memberId)) {
            throw new ForbiddenException("You don't have permission to access this room");
        }
    }
}
