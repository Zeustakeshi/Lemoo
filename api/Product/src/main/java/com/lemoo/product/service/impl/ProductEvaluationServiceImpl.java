/*
 *  ProductEvaluationServiceImpl
 *  @author: Minhhieuano
 *  @created 3/13/2025 10:42 AM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.common.enums.ProductStatus;
import com.lemoo.product.entity.Product;
import com.lemoo.product.event.eventModel.ProductEvaluationNotificationEvent;
import com.lemoo.product.event.producer.ProductEvaluationProducer;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.repository.ProductRepository;
import com.lemoo.product.service.ProductEvaluationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductEvaluationServiceImpl implements ProductEvaluationService {

    private final ProductEvaluationProducer productEvaluationProducer;
    private final ProductRepository productRepository;

    @Override
    public void handleEvaluationSuccess(String productId, Integer score, String note) {

        Product product = productRepository.findById(productId).orElseThrow(
                () -> new NotfoundException("Product " + productId + " not found")
        );

        // Update product status
        product.setStatus(ProductStatus.LIVE);
        productRepository.save(product);

        // send evaluation notification
        productEvaluationProducer.notifyEvaluation(ProductEvaluationNotificationEvent.builder()
                .isSuccess(true)
                .note(note)
                .productId(productId)
                .productImage(product.getSmallImage().getUrl())
                .storeId(product.getStoreId())
                .productName(product.getName())
                .build());
    }

    @Override
    public void handleEvaluationFailed(String productId, Integer score, String note) {
        Product product = productRepository.findById(productId).orElseThrow(
                () -> new NotfoundException("Product " + productId + " not found")
        );

        // Update product status
        product.setStatus(ProductStatus.REJECTED);
        productRepository.save(product);

        // send evaluation notification
        productEvaluationProducer.notifyEvaluation(ProductEvaluationNotificationEvent.builder()
                .isSuccess(false)
                .note(note)
                .productId(productId)
                .productImage(product.getSmallImage().getUrl())
                .storeId(product.getStoreId())
                .productName(product.getName())
                .build());
    }
}
