/*
 *  MediaClient
 *  @author: Minhhieuano
 *  @created 3/11/2025 10:58 AM
 * */


package com.lemoo.product.client;

import com.lemoo.product.dto.response.ApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;
import java.util.Set;

@FeignClient(name = "media-service", url = "${services.media-service}/internal")
public interface MediaClient {

    @PostMapping("images/batch")
    ApiResponse<Map<String, String>> batchGetMediaUrl(
            @RequestBody Set<String> mediaIds,
            @RequestHeader("x-store-id") String storeId
    );
}
