/*
 *  SearchClient
 *  @author: pc
 *  @created 4/18/2025 12:40 AM
 * */


package com.lemoo.chat_ai_mcp_server.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "search-service", url = "${services.search-service}")
public interface SearchClient {

    @GetMapping
    Object searchProducts(@RequestParam("q") String query);
}
