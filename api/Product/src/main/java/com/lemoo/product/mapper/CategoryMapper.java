/*
 *  CategoryMapper
 *  @author: Minhhieuano
 *  @created 12/14/2024 8:51 AM
 * */

package com.lemoo.product.mapper;

import com.lemoo.product.dto.response.CategoryResponse;
import com.lemoo.product.entity.Category;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CategoryMapper {

    @Mapping(target = "isLeaf", source = "leaf")
    CategoryResponse toCategoryResponse(Category category);
}
