/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:56 PM
 * */

package com.lemoo.product.service.impl;

import com.lemoo.product.client.StoreClient;
import com.lemoo.product.dto.request.VerifyStoreRequest;
import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {

    private final StoreClient storeClient;

    @Override
    public boolean checkStorePermission(String storeId, String accountId) {
        return storeClient.verifyStore(new VerifyStoreRequest(storeId, accountId)).getData();
    }
}
