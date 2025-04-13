/*
 *  ProductServiceImpl
 *  @author: Minhhieuano
 *  @created 2/25/2025 11:59 PM
 * */

package com.lemoo.shipping.service.impl;

import com.lemoo.shipping.client.ProductClient;
import com.lemoo.shipping.dto.response.SkuResponse;
import com.lemoo.shipping.service.SkuService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class SkuServiceImpl implements SkuService {
    private final ProductClient productClient;

    @Override
    public Set<SkuResponse> getSkuByCodes(Set<String> skuCodes) {
        return productClient.getSkuByCodes(skuCodes).getData();
    }
}
