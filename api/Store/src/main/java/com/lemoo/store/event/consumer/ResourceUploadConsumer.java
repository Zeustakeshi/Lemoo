/*
 *  ResourceUploadConsumer
 *  @author: Minhhieuano
 *  @created 12/13/2024 5:22 PM
 * */

package com.lemoo.store.event.consumer;

import com.lemoo.store.event.eventModel.UploadDocumentEvent;
import com.lemoo.store.service.impl.StoreDocumentService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ResourceUploadConsumer {
	private final StoreDocumentService storeDocumentService;

	@EventListener
	public void handleUpdateDocument(UploadDocumentEvent event) {

		System.out.println("update document " + event.getType());
		storeDocumentService.uploadDocument(event.getStoreId(), event.getType(), event.getImage());
	}
}
