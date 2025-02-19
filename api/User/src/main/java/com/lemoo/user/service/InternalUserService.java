/*
 *  InternalUserService
 *  @author: Minhhieuano
 *  @created 1/4/2025 4:30 PM
 * */

package com.lemoo.user.service;

import com.lemoo.user.dto.request.BatchFetchUserInfoRequest;
import com.lemoo.user.dto.response.InternalUserResponse;

import java.util.Set;

public interface InternalUserService {
    InternalUserResponse getUserById(String userId);

    Set<InternalUserResponse> batchFetchUserInfo(BatchFetchUserInfoRequest request);
}
