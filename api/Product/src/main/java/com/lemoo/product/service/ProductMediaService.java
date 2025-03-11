/*
 *  ProductMediaService
 *  @author: Minhhieuano
 *  @created 3/11/2025 11:05 AM
 * */

package com.lemoo.product.service;

import java.util.Map;
import java.util.Set;

public interface ProductMediaService {
    Map<String, String> batchGetMediaUrl(Set<String> mediaIds, String storeId);
}
