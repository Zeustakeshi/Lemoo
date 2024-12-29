/*
 *  CategoryController
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:14 AM
 * */

package com.lemoo.product.controller;

import com.lemoo.product.dto.request.CategoryRequestNoFile;
import com.lemoo.product.dto.request.CategoryRequestWithFile;
import com.lemoo.product.dto.response.ApiResponse;
import com.lemoo.product.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @PostMapping("/file")
    public ApiResponse<?> createCategoryWithFile(@ModelAttribute @Valid CategoryRequestWithFile request) {
        return ApiResponse.success(categoryService.createCategory(request));
    }

    @PostMapping()
    public ApiResponse<?> createCategory(@RequestBody @Valid CategoryRequestNoFile request) {
        return ApiResponse.success(categoryService.createCategory(request));
    }

    @GetMapping
    public ApiResponse<?> getAllCategory(
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit,
            @RequestParam(value = "parent", required = false) String parentId) {
        return ApiResponse.success(categoryService.getAllCategoryByParentId(parentId, page, limit));
    }


}
