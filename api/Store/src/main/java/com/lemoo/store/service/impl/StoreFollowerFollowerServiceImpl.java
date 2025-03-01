/*
 *  UserStoreServiceImpl
 *  @author: Minhhieuano
 *  @created 2/24/2025 10:31 PM
 * */


package com.lemoo.store.service.impl;

import com.lemoo.store.dto.common.AuthenticatedAccount;
import com.lemoo.store.entity.Store;
import com.lemoo.store.exception.NotfoundException;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.StoreFollowerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class StoreFollowerFollowerServiceImpl implements StoreFollowerService {

    private final StoreRepository storeRepository;

    @Override
    @Transactional
    public boolean getFollowStatus(String storeId, AuthenticatedAccount account) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        return store.getFollowers().contains(account.getUserId());
    }

    @Override
    @Transactional
    public boolean followStore(String storeId, AuthenticatedAccount account) {
        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        if (store.getFollowers().contains(account.getUserId())) return false;

        store.getFollowers().add(account.getUserId());

        storeRepository.save(store);

        return true;
    }

    @Override
    @Transactional
    public boolean unFollowStore(String storeId, AuthenticatedAccount account) {

        Store store = storeRepository.findById(storeId)
                .orElseThrow(() -> new NotfoundException("Store " + storeId + " not found"));
        if (!store.getFollowers().contains(account.getUserId())) return false;

        store.getFollowers().remove(account.getUserId());

        storeRepository.save(store);

        return true;
    }
}
