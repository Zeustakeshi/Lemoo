/*
 *  GroupRoomService
 *  @author: Minhhieuano
 *  @created 2/14/2025 5:20 PM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.GroupRoomRequest;

public interface GroupRoomService {
    boolean createGroupRoom(GroupRoomRequest request, AuthenticatedAccount account);

    boolean addUserToRoom(String inviteeId, String roomId, AuthenticatedAccount account);
}
