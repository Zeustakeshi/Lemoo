/*
 *  PromotionClient
 *  @author: pc
 *  @created 3/26/2025 12:55 AM
 * */


package com.lemoo.order_v2.client;


import com.lemoo.order_v2.dto.request.ValidateVoucherRequest;
import com.lemoo.order_v2.dto.response.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(url = "${services.promotion-service}/internal", name = "promotion-service")
public interface PromotionClient {

    @PostMapping("/vouchers/check")
    ApiResponse<Boolean> applyVoucherCheck(
            @RequestBody @Valid ValidateVoucherRequest request
    );
}
