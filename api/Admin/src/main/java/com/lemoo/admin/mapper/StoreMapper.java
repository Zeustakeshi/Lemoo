/*
 *  StoreMapper
 *  @author: Minhhieuano
 *  @created 1/28/2025 4:15 PM
 * */


package com.lemoo.admin.mapper;

import com.lemoo.admin.entity.Store;
import com.lemoo.admin.event.eventModel.NewStoreEvent;
import org.mapstruct.Mapper;

@Mapper
public interface StoreMapper {
    Store toStore(NewStoreEvent newStoreEvent);
}
