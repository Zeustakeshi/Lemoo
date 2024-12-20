/*
 *  CommentMapper
 *  @author: Minhhieuano
 *  @created 12/18/2024 4:38 PM
 * */

package com.lemoo.video.mapper;

import com.lemoo.video.dto.response.CommentResponse;
import com.lemoo.video.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {

	@Mapping(target = "isEdited", ignore = true)
	@Mapping(target = "reaction", ignore = true)
	CommentResponse toCommentResponse(Comment comment);
}
