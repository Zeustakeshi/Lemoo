/*
 *  ProductClient
 *  @author: Minhhieuano
 *  @created 1/25/2025 12:01 PM
 * */

package com.lemoo.order.client;

import com.lemoo.order.dto.response.ApiResponse;
import com.lemoo.order.dto.response.SkuResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@FeignClient(url = "${services.product-service}/internal", name = "product-service")
public interface ProductClient {

    @PostMapping("/skus")
    ApiResponse<Set<SkuResponse>> getSkuByCodes(@RequestBody Set<String> skuCodes);
}
