/*
 *  ProductMediaServiceImpl
 *  @author: Minhhieuano
 *  @created 3/11/2025 11:06 AM
 * */


package com.lemoo.product.service.impl;

import com.lemoo.product.client.MediaClient;
import com.lemoo.product.service.ProductMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class ProductMediaServiceImpl implements ProductMediaService {
    private final MediaClient mediaClient;

    @Override
    public Map<String, String> batchGetMediaUrl(Set<String> mediaIds, String storeId) {
        return mediaClient.batchGetMediaUrl(mediaIds, storeId).getData();
    }
}
