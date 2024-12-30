/*
 *  StoreDocumentService
 *  @author: Minhhieuano
 *  @created 12/13/2024 5:26 PM
 * */

package com.lemoo.store.service;

public interface StoreDocumentService {

	void uploadBankDocumentAsync(String storeId, byte[] document);

	void uploadCitizenIdDocumentAsync(String storeId, byte[] document, boolean isFrontSide);

	void uploadTaxDocumentAsync(String storeId, byte[] document);

	void uploadBusinessDocumentAsync(String storeId, byte[] document);
}
