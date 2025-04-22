/*
 *  ShippingClient
 *  @author: pc
 *  @created 4/22/2025 9:47 PM
 * */


package com.lemoo.chat_ai_mcp_server.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "shipping-service", url = "${services.shipping-service}/internal")
public interface ShippingClient {

    @GetMapping("address")
    Object getAllShippingAddress(
            @RequestHeader("x-user-id") String userId
    );

}
