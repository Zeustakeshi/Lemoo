/*
 *  RoomService
 *  @author: Minhhieuano
 *  @created 2/7/2025 3:55 PM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.dto.response.RoomDetailResponse;
import com.lemoo.chat.dto.response.RoomResponse;
import com.lemoo.chat.entity.Room;

public interface RoomService {

    void createSingleRoom(String user1Id, String user2Id);

    PageableResponse<RoomResponse> getAllRoom(int page, int limit, AuthenticatedAccount account);

    RoomDetailResponse getRoomDetail(String roomId, AuthenticatedAccount account);

    Room findRoomById(String roomId);
    
}
