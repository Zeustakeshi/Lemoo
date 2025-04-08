/*
 *  ProductOrderService
 *  @author: Minhhieuano
 *  @created 1/18/2025 4:12 PM
 * */


package com.lemoo.product.service;

import java.util.Map;

public interface ProductOrderService {
    void reserveProduct(Map<String, Integer> skus) throws Exception;
}
