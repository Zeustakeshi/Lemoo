/*
 *  ChannelMapper
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:15 AM
 * */


package com.lemoo.video.mapper;

import com.lemoo.video.dto.response.ChannelResponse;
import com.lemoo.video.entity.Channel;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ChannelMapper {

    @Mapping(target = "isFollowed", ignore = true)
    ChannelResponse toChannelResponse(Channel channel);
}
