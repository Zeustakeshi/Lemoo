/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:26 PM
 * */


package com.lemoo.store.service.impl;

import com.lemoo.store.dto.request.CreateIndividualStoreRequest;
import com.lemoo.store.dto.response.StoreResponse;
import com.lemoo.store.entity.Store;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.mapper.StoreMapper;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {
    private final StoreRepository storeRepository;
    private final StoreMapper storeMapper;

    @Override
    public StoreResponse getStoreInfo(String ownerId) {
        Store store = storeRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new NotfoundException("Store doesn't exist "));
        return storeMapper.storeToStoreResponse(store);
    }

    @Override
    public StoreResponse createIndividualStore(String ownerId, CreateIndividualStoreRequest request) {
        return null;
        // save store information
        // update document async
        //
    }

}
