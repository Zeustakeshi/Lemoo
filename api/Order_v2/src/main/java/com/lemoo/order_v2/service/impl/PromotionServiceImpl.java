/*
 *  PromotionServiceImpl
 *  @author: pc
 *  @created 3/26/2025 12:04 AM
 * */


package com.lemoo.order_v2.service.impl;

import com.lemoo.order_v2.client.PromotionClient;
import com.lemoo.order_v2.dto.request.ValidateVoucherRequest;
import com.lemoo.order_v2.service.PromotionService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class PromotionServiceImpl implements PromotionService {

    private final PromotionClient promotionClient;

    @Override
    public void validateVoucher(String userId, Set<String> vouchers, Set<String> skus) {
        promotionClient.applyVoucherCheck(ValidateVoucherRequest
                .builder()
                .userId(userId)
                .skus(skus)
                .voucherIds(vouchers)
                .build()
        );
    }

}
