/*
 *  GhnClient
 *  @author: pc
 *  @created 3/28/2025 2:37 AM
 * */


package com.lemoo.shipping.client;

import com.lemoo.shipping.config.GhnRequestInterceptor;
import com.lemoo.shipping.dto.request.NewShippingOrderRequest;
import com.lemoo.shipping.dto.response.GhnApiResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.List;

@FeignClient(
        url = "${services.external.ghn}",
        name = "ghn-service",
        configuration = GhnRequestInterceptor.class
)
public interface GhnClient {

    @PostMapping("/v2/shipping-order/create")
    void createShippingOrder(@RequestBody NewShippingOrderRequest request);

    @GetMapping("/master-data/province")
    GhnApiResponse<List<HashMap<Object, Object>>> getProvince();

    @GetMapping("/master-data/district")
    GhnApiResponse<List<HashMap<Object, Object>>> getDistrict(
            @RequestParam("province_id") String provinceId
    );

    @GetMapping("/master-data/ward")
    GhnApiResponse<List<HashMap<Object, Object>>> getWard(
            @RequestParam("district_id") String districtId
    );
}
