/*
 *  RoomValidatorService
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:16 PM
 * */

package com.lemoo.chat.service;

import java.util.Set;

public interface RoomValidatorService {
	Set<String> validateMemberRequest(Set<String> members);
}
