/*
 *  ProductClient
 *  @author: Minhhieuano
 *  @created 1/25/2025 12:01 PM
 * */

package com.lemoo.shipping.client;

import com.lemoo.shipping.dto.response.ApiResponse;
import com.lemoo.shipping.dto.response.SkuResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.Set;

@FeignClient(url = "${services.product-service}/internal", name = "product-service")
public interface ProductClient {

    @PostMapping("/skus")
    ApiResponse<Set<SkuResponse>> getSkuByCodes(@RequestBody Set<String> skuCodes);

    @GetMapping("/skus/{skuCode}")
    ApiResponse<SkuResponse> getSkuBySkuCode(@PathVariable("skuCode") String skuCode);
}
