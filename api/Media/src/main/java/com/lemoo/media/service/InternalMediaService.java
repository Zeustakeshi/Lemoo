/*
 *  InternalMediaService
 *  @author: Minhhieuano
 *  @created 3/11/2025 11:21 AM
 * */


package com.lemoo.media.service;

import java.util.Map;
import java.util.Set;

public interface InternalMediaService {
    Map<String, String> batchGetImageMediaUrl(Set<String> mediaIds, String storeId);
}
