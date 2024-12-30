/*
 *  MediaMapper
 *  @author: Minhhieuano
 *  @created 12/26/2024 10:27 AM
 * */

package com.lemoo.media.mapper;

import com.lemoo.media.dto.response.MediaResponse;
import com.lemoo.media.entity.BaseMedia;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MediaMapper {
	MediaResponse toMediaResponse(BaseMedia media);
}
