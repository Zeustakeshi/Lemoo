/*
 *  PromotionService
 *  @author: pc
 *  @created 3/26/2025 12:02 AM
 * */


package com.lemoo.order_v2.service;

import java.util.Set;

public interface PromotionService {

    void validateVoucher(String userId, Set<String> vouchers, Set<String> skus);
}
