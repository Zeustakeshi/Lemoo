/*
 *  StoreClient
 *  @author: pc
 *  @created 3/26/2025 10:55 AM
 * */

package com.lemoo.shipping.client;

import com.lemoo.shipping.dto.request.VerifyStoreRequest;
import com.lemoo.shipping.dto.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-service", url = "${services.store-service}/internal")
public interface StoreClient {
    @PostMapping("/verify")
    ApiResponse<Boolean> verifyStore(@RequestBody @Valid VerifyStoreRequest request);
}
