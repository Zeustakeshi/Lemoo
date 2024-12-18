/*
 *  StoreServiceImpl
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:56 PM
 * */

package com.lemoo.product.service.impl;

import com.lemoo.product.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StoreServiceImpl implements StoreService {
	@Override
	public boolean checkStorePermission(String storeId, String userId) {
		return true;
	}
}
