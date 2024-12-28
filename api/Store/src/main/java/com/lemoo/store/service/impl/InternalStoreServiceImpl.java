/*
 *  InternalStoreServiceImpl
 *  @author: Minhhieuano
 *  @created 12/26/2024 5:49 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.dto.request.VerifyStoreRequest;
import com.lemoo.store.repository.StoreRepository;
import com.lemoo.store.service.InternalStoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InternalStoreServiceImpl implements InternalStoreService {

	private final StoreRepository storeRepository;

	@Override
	public boolean verifyStore(VerifyStoreRequest request) {
		return storeRepository.existsByIdAndOwnerId(request.getStoreId(), request.getAccountId());
	}
}
