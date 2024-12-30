/*
 *  InternalStoreService
 *  @author: Minhhieuano
 *  @created 12/26/2024 5:48 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.request.VerifyStoreRequest;

public interface InternalStoreService {
	boolean verifyStore(VerifyStoreRequest request);
}
