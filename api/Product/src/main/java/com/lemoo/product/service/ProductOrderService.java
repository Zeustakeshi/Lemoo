/*
 *  ProductOrderService
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:12 PM
 * */


package com.lemoo.product.service;

import com.lemoo.product.domain.OrderSku;

import java.util.Map;

public interface ProductOrderService {
    void checkProductOrder(String orderId, Map<String, OrderSku> skus);
}
