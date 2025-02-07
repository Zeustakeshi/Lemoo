/*
 *  RoomService
 *  @author: Minhhieuano
 *  @created 2/7/2025 3:55 PM
 * */

package com.lemoo.chat.service;

import com.lemoo.chat.dto.common.AuthenticatedAccount;
import com.lemoo.chat.dto.request.RoomRequest;
import com.lemoo.chat.dto.response.PageableResponse;
import com.lemoo.chat.dto.response.RoomResponse;

public interface RoomService {
	boolean createRoom(AuthenticatedAccount account, RoomRequest request);

	PageableResponse<RoomResponse> getAllRoom(int page, int limit, AuthenticatedAccount account);
}
