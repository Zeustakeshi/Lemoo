/*
 *  VideoMapper
 *  @author: Minhhieuano
 *  @created 12/17/2024 8:01 PM
 * */

package com.lemoo.video.mapper;

import com.lemoo.video.dto.request.UpdateVideoMetadataRequest;
import com.lemoo.video.dto.response.UpdateVideoResponse;
import com.lemoo.video.dto.response.VideoResponse;
import com.lemoo.video.dto.response.VideoViewResponse;
import com.lemoo.video.entity.Video;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface VideoMapper {
    UpdateVideoResponse toUpdateVideoResponse(Video video);

    VideoResponse toVideoResponse(Video video);

    @Mapping(target = "channel", ignore = true)
    VideoViewResponse toVideoViewResponse(Video video);

    @Mapping(target = "products", ignore = true)
    void updateVideoByMetadata(UpdateVideoMetadataRequest request, @MappingTarget Video video);

}
