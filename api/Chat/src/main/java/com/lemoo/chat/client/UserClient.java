/*
 *  UserClient
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:00 PM
 * */

package com.lemoo.chat.client;

import com.lemoo.chat.dto.request.BatchFetchUserInfoRequest;
import com.lemoo.chat.dto.response.ApiResponse;
import com.lemoo.chat.dto.response.UserResponse;
import jakarta.validation.Valid;
import java.util.Set;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "user-service", url = "${services.user-service}/internal")
public interface UserClient {
	@GetMapping("{userId}")
	ApiResponse<UserResponse> getUserInfo(@PathVariable("userId") String userid);

	@PostMapping("batch-fetch")
	ApiResponse<Set<UserResponse>> batchFetchUserInfo(@RequestBody @Valid BatchFetchUserInfoRequest request);
}
