/*
 *  CategoryService
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:23 AM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.request.CategoryRequest;
import com.lemoo.product.dto.response.CategoryResponse;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.entity.Category;

import java.util.List;

public interface CategoryService {
    CategoryResponse createCategory(CategoryRequest dto);

    List<Category> getCategoriesBulk(List<String> categoryIds);

    List<String> getCategoryPath(String categoryId);

    Category findById(String categoryId);

    PageableResponse<CategoryResponse> getAllCategoryByParentId(String parentId, int page, int limit);
}
