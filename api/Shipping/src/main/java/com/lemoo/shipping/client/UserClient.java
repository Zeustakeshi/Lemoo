/*
 *  UserClient
 *  @author: Minhhieuano
 *  @created 2/7/2025 4:00 PM
 * */

package com.lemoo.shipping.client;

import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.dto.response.UserResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "user-service", url = "${services.user-service}/internal")
public interface UserClient {
    @GetMapping("{userId}")
    ApiResponse<UserResponse> getUserInfo(@PathVariable("userId") String userid);

}
