/*
 *  StoreClient
 *  @author: Minhhieuano
 *  @created 12/27/2024 9:59 PM
 * */

package com.lemoo.promotion.client;

import com.lemoo.promotion.dto.request.VerifyStoreRequest;
import com.lemoo.promotion.dto.response.ApiResponse;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@FeignClient(name = "store-service", url = "${services.store-service}/internal")
public interface StoreClient {
    @PostMapping("verify")
    @CircuitBreaker(name = "store-service")
    ApiResponse<Boolean> verifyStore(@RequestBody @Valid VerifyStoreRequest request);

    @GetMapping("/{storeId}/followers")
    ApiResponse<Set<String>> getStoreFollowers(@PathVariable("storeId") String storeId);
}
