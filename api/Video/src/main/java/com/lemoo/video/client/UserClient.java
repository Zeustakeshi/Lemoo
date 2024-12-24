/*
 *  UserClient
 *  @author: Minhhieuano
 *  @created 12/23/2024 11:14 PM
 * */

package com.lemoo.video.client;

import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "${services.user-service}/internal")
public interface UserClient {
    @GetMapping("{userId}")
    ApiResponse<UserResponse> getUserInfo(@PathVariable("userId") String userid);
}
