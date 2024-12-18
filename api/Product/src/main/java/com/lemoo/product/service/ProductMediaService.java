/*
 *  ProductMediaService
 *  @author: Minhhieuano
 *  @created 12/15/2024 9:38 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.request.DeleteProductImageRequest;
import com.lemoo.product.dto.request.UploadProductImageRequest;
import com.lemoo.product.entity.ProductMedia;

public interface ProductMediaService {
	ProductMedia uploadImage(String storeId, String userId, String productId, UploadProductImageRequest request);

	void deleteImage(String storeId, String userId, String productId, DeleteProductImageRequest request);
}
