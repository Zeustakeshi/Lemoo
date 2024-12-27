/*
 *  StoreClient
 *  @author: Minhhieuano
 *  @created 12/27/2024 9:59 PM
 * */

package com.lemoo.promotion.client;

import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-service", url = "${services.store-service}/internal")
public interface StoreClient {
    @PostMapping("verify")
    ApiResponse<Boolean> verifyStore(@RequestBody @Valid VerifyStoreRequest request);
}
