/*
 *  StoreClient
 *  @author: Minhhieuano
 *  @created 1/4/2025 12:45 PM
 * */

package com.lemoo.video.client;

import com.lemoo.video.dto.request.VerifyStoreRequest;
import com.lemoo.video.dto.response.ApiResponse;
import com.lemoo.video.dto.response.StoreInfoResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "store-service", url = "${services.store-service}/internal")
public interface StoreClient {

    @GetMapping("info")
    ApiResponse<StoreInfoResponse> getStoreInfo(@RequestParam("accountId") String accountId);

    @PostMapping("/verify")
    ApiResponse<Boolean> verifyStore(@RequestBody @Valid VerifyStoreRequest request);
}
