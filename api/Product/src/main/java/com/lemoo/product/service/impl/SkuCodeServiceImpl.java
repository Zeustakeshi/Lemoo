/*
 *  SkuCodeService
 *  @author: Minhhieuano
 *  @created 12/29/2024 11:10 AM
 * */


package com.lemoo.product.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.product.common.utils.ShortCodeGenerator;
import com.lemoo.product.service.SkuCodeService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SkuCodeServiceImpl implements SkuCodeService {

    @Override
    @SneakyThrows
    public String generateCategorySku() {
        return ShortCodeGenerator.generateShortCode(
                NanoIdUtils.randomNanoId(),
                LocalDateTime.now().toString(),
                null
        );
    }

    @Override
    @SneakyThrows
    public String generateProductSku(String categoryCode, List<String> skuVariant) {
        String shortCodePayload = NanoIdUtils.randomNanoId() + String.join("-", skuVariant);
        return categoryCode + "_" + ShortCodeGenerator.generateShortCode(
                shortCodePayload,
                LocalDateTime.now().toString(),
                null
        );
    }
}
