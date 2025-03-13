/*
 *  ProductEvaluationService
 *  @author: Minhhieuano
 *  @created 3/13/2025 10:40 AM
 * */

package com.lemoo.product.service;

public interface ProductEvaluationService {
    void handleEvaluationSuccess(String productId, Integer score, String note);

    void handleEvaluationFailed(String productId, Integer score, String note);
}
