/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:05 PM
 * */


package com.lemoo.admin.service.impl;

import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.dto.response.PageableResponse;
import com.lemoo.admin.entity.Store;
import com.lemoo.admin.event.eventModel.DeactivateStoreEvent;
import com.lemoo.admin.event.eventModel.NewSellerEvent;
import com.lemoo.admin.event.producer.AuthProducer;
import com.lemoo.admin.event.producer.StoreProducer;
import com.lemoo.admin.exception.NotfoundException;
import com.lemoo.admin.mapper.PageMapper;
import com.lemoo.admin.repository.StoreRepository;
import com.lemoo.admin.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {
    private final StoreRepository storeRepository;
    private final PageMapper pageMapper;
    private final AuthProducer authProducer;
    private final StoreProducer storeProducer;

    @Override
    public void saveStore(Store store) {
        storeRepository.save(store);
    }

    @Override
    public Store findByStoreId(String storeId) {
        return storeRepository.findByStoreId(storeId).orElseThrow(() -> new NotfoundException("Store not found."));
    }

    @Override
    public Store findByAccountId(String accountId) {
        return storeRepository.findByAccountId(accountId)
                .orElseThrow(() -> new NotfoundException("Store not found."));
    }

    @Override
    public PageableResponse<Store> getAllStoreByStatus(StoreStatus status, int page, int limit) {
        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "createdAt"));
        Page<Store> stores = storeRepository.findAllByStatus(status, request);
        return pageMapper.toPageableResponse(stores);
    }

    @Override
    public boolean activateStore(String storeId) {
        Store store = storeRepository.findByStoreId(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        store.setStatus(StoreStatus.ACTIVE);
        storeRepository.save(store);

        // Send an event to the auth service to update the seller's role.
        authProducer.addSellerRole(NewSellerEvent.builder()
                .accountId(store.getAccountId())
                .build());

        return store.getStatus() == StoreStatus.ACTIVE;
    }

    @Override
    public boolean deactivateStore(String storeId) {
        Store store = storeRepository.findByStoreId(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        store.setStatus(StoreStatus.NOT_ACTIVE);

        storeRepository.save(store);

        storeProducer.deactivateStore(DeactivateStoreEvent.builder()
                .storeId(storeId)
                .build());

        return store.getStatus() == StoreStatus.NOT_ACTIVE;
    }
}
