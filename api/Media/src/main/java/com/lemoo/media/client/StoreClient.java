/*
 *  StoreClient
 *  @author: Minhhieuano
 *  @created 12/26/2024 10:03 AM
 * */


package com.lemoo.media.client;

import com.lemoo.media.dto.request.VerifyStoreRequest;
import com.lemoo.media.dto.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-service", url = "${services.store-service}/internal")
public interface StoreClient {
    @PostMapping("/verify")
    ApiResponse<Boolean> verifyStore(
            @RequestBody @Valid VerifyStoreRequest request
    );
}
