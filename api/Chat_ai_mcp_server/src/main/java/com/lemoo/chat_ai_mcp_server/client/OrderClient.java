/*
 *  SearchClient
 *  @author: pc
 *  @created 4/18/2025 12:40 AM
 * */


package com.lemoo.chat_ai_mcp_server.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "order-service", url = "${services.order-service}/internal")
public interface OrderClient {
    @GetMapping("/users/{userId}")
    Object getAllUserOrder(
            @PathVariable("userId") String userId,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit
    );
}
