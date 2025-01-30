/*
 *  PageMapper
 *  @author: Minhhieuano
 *  @created 10/3/2024 12:23 PM
 * */

package com.lemoo.shipping.mapper;

import com.lemoo.shipping.dto.response.PageableResponse;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface PageMapper {
    @Mapping(source = "totalPages", target = "totalPages")
    @Mapping(source = "totalElements", target = "totalElements")
    @Mapping(source = "size", target = "size")
    @Mapping(source = "content", target = "content")
    @Mapping(source = "first", target = "first")
    @Mapping(source = "last", target = "last")
    @Mapping(source = "number", target = "pageNumber")
    @Mapping(source = "empty", target = "empty")
    PageableResponse toPageableResponse(Page page);
}
