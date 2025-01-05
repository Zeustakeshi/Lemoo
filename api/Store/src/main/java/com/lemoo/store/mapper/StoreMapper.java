/*
 *  StoreMapper
 *  @author: Minhhieuano
 *  @created 11/13/2024 8:40 PM
 * */

package com.lemoo.store.mapper;

import com.lemoo.store.dto.response.InternalStoreResponse;
import com.lemoo.store.dto.response.StoreResponse;
import com.lemoo.store.entity.Store;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    StoreResponse storeToStoreResponse(Store store);

    InternalStoreResponse toInternalStoreResponse(Store store);
}
