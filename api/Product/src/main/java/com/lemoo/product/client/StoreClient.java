/*
 *  StoreClient
 *  @author: Minhhieuano
 *  @created 12/26/2024 4:03 PM
 * */

package com.lemoo.product.client;

import com.lemoo.product.dto.request.VerifyStoreRequest;
import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.dto.response.StoreResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "store-service", url = "${services.store-service}")
public interface StoreClient {
    @PostMapping("/internal/verify")
    ApiResponse<Boolean> verifyStore(@RequestBody @Valid VerifyStoreRequest request);

    @GetMapping("/open/{storeId}")
    ApiResponse<StoreResponse> getStoreInfo(@PathVariable("storeId") String storeId);
}
