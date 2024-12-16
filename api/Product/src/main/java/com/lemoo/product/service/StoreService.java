/*
 *  StoreService
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:55 PM
 * */

package com.lemoo.product.service;

public interface StoreService {
	boolean checkStorePermission(String storeId, String userId);
}
