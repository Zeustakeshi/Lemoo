/*
 *  StoreDocumentService
 *  @author: Minhhieuano
 *  @created 12/13/2024 5:26 PM
 * */

package com.lemoo.store.service.impl;

import com.lemoo.store.common.enums.DocumentType;

public interface StoreDocumentService {
	void uploadDocument(String storeId, DocumentType type, byte[] image);
}
