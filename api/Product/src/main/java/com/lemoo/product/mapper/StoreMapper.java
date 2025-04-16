/*
 *  StoreMapper
 *  @author: pc
 *  @created 4/16/2025 9:03 AM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.response.StoreResponse;
import org.mapstruct.Mapper;

import java.util.Map;

@Mapper
public interface StoreMapper {
    default StoreResponse toStoreResponse(Map<String, String> storeMap) {
        return StoreResponse.builder()
                .id(storeMap.get("id"))
                .logo(storeMap.get("logo"))
                .name(storeMap.get("name"))
                .build();
    }

    default Map<String, String> toStoreMap(StoreResponse store) {
        return Map.of(
                "id", store.getId(),
                "name", store.getName(),
                "logo", store.getLogo()
        );
    }
}
