/*
 *  PromotionServiceImpl
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:02 PM
 * */


package com.lemoo.promotion.service.impl;

import com.lemoo.promotion.event.eventModel.PromotionCheckedEvent;
import com.lemoo.promotion.event.producer.OrderProducer;
import com.lemoo.promotion.service.UserVoucherService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class UserVoucherServiceImpl implements UserVoucherService {

    private final OrderProducer orderProducer;

    @Override
    public void checkOrderVoucher(String orderId, String userId, Set<String> promotions) {
        orderProducer.promotionChecked(PromotionCheckedEvent.builder()
                .orderId(orderId)
                .build());
    }
}
