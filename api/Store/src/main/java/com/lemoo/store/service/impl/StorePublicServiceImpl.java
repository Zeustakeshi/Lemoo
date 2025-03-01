/*
 *  StorePublicServiceImpl
 *  @author: Minhhieuano
 *  @created 3/1/2025 8:58 PM
 * */


package com.lemoo.store.service.impl;

import com.lemoo.store.dto.response.StorePublicResponse;
import com.lemoo.store.entity.Store;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.mapper.StoreMapper;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.StorePublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StorePublicServiceImpl implements StorePublicService {
    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;

    @Override
    @Transactional
    public StorePublicResponse getStoreInfo(String storeId) {
        Store store = storeRepository
                .findActiveStoreById(storeId)
                .orElseThrow(() -> new NotfoundException("Store doesn't exist."));
        return storeMapper.toStorePublicResponse(store);
    }
}
