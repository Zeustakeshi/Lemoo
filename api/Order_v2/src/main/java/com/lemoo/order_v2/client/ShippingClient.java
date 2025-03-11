/*
 *  ShippingClient
 *  @author: Minhhieuano
 *  @created 3/11/2025 12:19 AM
 * */


package com.lemoo.order_v2.client;

import com.lemoo.order_v2.dto.response.ApiResponse;
import com.lemoo.order_v2.dto.response.ShippingAddressResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(url = "${services.shipping-service}/internal", name = "shipping-service")
public interface ShippingClient {
    @GetMapping("/{addressId}")
    ApiResponse<ShippingAddressResponse> getShippingAddressByIdAndUserId(
            @PathVariable String addressId,
            @RequestHeader("x-user-id") String userId
    );
}
