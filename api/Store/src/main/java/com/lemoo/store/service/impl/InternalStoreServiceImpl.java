/*
 *  InternalStoreServiceImpl
 *  @author: Minhhieuano
 *  @created 12/26/2024 5:49 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.dto.request.VerifyStoreRequest;
import com.lemoo.store.dto.response.InternalStoreResponse;
import com.lemoo.store.entity.Store;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.mapper.StoreMapper;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.InternalStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class InternalStoreServiceImpl implements InternalStoreService {

    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;

    @Override
    public boolean verifyStore(VerifyStoreRequest request) {
        return storeRepository.existsByIdAndOwnerId(request.getStoreId(), request.getAccountId());
    }

    @Override
    public InternalStoreResponse getStoreInfoByAccountId(String accountId) {
        Store store = storeRepository.findActiveStore(accountId)
                .orElseThrow(() -> new NotfoundException("Store not found"));
        return storeMapper.toInternalStoreResponse(store);
    }


    @Override
    public Set<String> getStoreFollowers(String storeId) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        return store.getFollowers();
    }
}
