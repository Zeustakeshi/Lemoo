/*
 *  ProductService
 *  @author: Minhhieuano
 *  @created 12/26/2024 12:45 AM
 * */

package com.lemoo.media.service;

import com.lemoo.media.dto.common.AuthenticatedAccount;
import com.lemoo.media.dto.request.UploadImageRequest;
import com.lemoo.media.dto.response.MediaResponse;
import com.lemoo.media.dto.response.PageableResponse;

public interface StoreMediaService {
	MediaResponse uploadImage(String storeId, AuthenticatedAccount account, UploadImageRequest request);

	PageableResponse<MediaResponse> getAllImageByStoreId(
			String storeId, AuthenticatedAccount account, int page, int limit);

	void uploadImageAsync(String storeId, AuthenticatedAccount account, UploadImageRequest request);

	void deleteImage(String imageId, String storeId, AuthenticatedAccount account);

	void deleteImageAsync(String imageId, String storeId, AuthenticatedAccount account);
}
