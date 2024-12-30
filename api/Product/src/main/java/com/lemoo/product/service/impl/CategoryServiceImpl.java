/*
 *  CategoryServiceImpl
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:23 AM
 * */

package com.lemoo.product.service.impl;

import com.lemoo.product.client.CategoryClient;
import com.lemoo.product.dto.request.CategoryRequest;
import com.lemoo.product.dto.response.CategoryResponse;
import com.lemoo.product.dto.response.PageableResponse;
import com.lemoo.product.entity.Category;
import com.lemoo.product.exception.ConflictException;
import com.lemoo.product.exception.NotfoundException;
import com.lemoo.product.mapper.CategoryMapper;
import com.lemoo.product.mapper.PageMapper;
import com.lemoo.product.repository.CategoryRepository;
import com.lemoo.product.service.CategoryService;
import com.lemoo.product.service.ResourceService;
import com.lemoo.product.service.SkuCodeService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private static final Integer MAXIMUM_DEPTH_LEVEL = 4;

    private final CategoryRepository categoryRepository;
    private final CategoryClient categoryClient;
    private final CategoryMapper categoryMapper;
    private final PageMapper pageMapper;
    private final ResourceService resourceService;
    private final SkuCodeService skuCodeService;

    @Override
    @SneakyThrows
    public CategoryResponse createCategory(CategoryRequest dto) {
        if (categoryRepository.existsByNameAndParentId(dto.getName(), dto.getParentId())) {
            throw new ConflictException("Category name \"" + dto.getName() + "\" already existed.");
        }

        Category category = Category.builder()
                .name(dto.getName())
                .isLeaf(true)
                .code(skuCodeService.generateCategorySku())
                .build();

        List<String> paths = new ArrayList<>();

        if (dto.getParentId() != null) {
            Category parent = categoryRepository
                    .findById(dto.getParentId())
                    .orElseThrow(
                            () -> new NotfoundException("Category with id: " + dto.getParentId() + " doesn't exist"));

            if (parent.getPaths().size() < MAXIMUM_DEPTH_LEVEL) {
                parent.setLeaf(false);
                categoryRepository.save(parent);
                category.setParentId(parent.getId());
                paths = new ArrayList<>(List.copyOf(parent.getPaths()));
                paths.add(dto.getParentId());
            } else {
                category.setParentId(parent.getParentId());
                paths = new ArrayList<>(List.copyOf(parent.getPaths()));
            }
            category.setPaths(paths);
        }

        if (dto.getImageUrl() != null) {
            category.setImage(dto.getImageUrl());
        }

        Category newCategory = categoryRepository.save(category);

        if (dto.getImage() != null) {
            resourceService
                    .uploadImageAsync(dto.getImage().getBytes(), newCategory.getId(), "/categories")
                    .thenAccept((data) -> updateCategoryImage(category.getId(), data.getSecureUrl()));
        }

        return categoryMapper.categoryToCategoryResponse(newCategory);
    }

    @Override
    public PageableResponse<CategoryResponse> getAllCategoryByParentId(String parentId, int page, int limit) {
        PageRequest pageRequest = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<Category> categories = categoryRepository.findAllByParentId(parentId, pageRequest);

        Page<CategoryResponse> categoryResponses = categories.map(categoryMapper::categoryToCategoryResponse);

        return pageMapper.toPageableResponse(categoryResponses);
    }

    @Override
    public List<Category> getCategoriesBulk(List<String> categoryIds) {
        return categoryRepository.findAllById(categoryIds);
    }

    @Override
    public List<String> getCategoryPath(String categoryId) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new NotfoundException("Category " + categoryId + " not found"));
        category.getPaths().add(categoryId);
        return category.getPaths();
    }

    @Override
    public Category findById(String categoryId) {
        return categoryRepository
                .findById(categoryId)
                .orElseThrow(() -> new NotfoundException("Category " + categoryId + " not found"));
    }

    private void updateCategoryImage(String categoryId, String image) {
        Category category = categoryRepository
                .findById(categoryId)
                .orElseThrow(() ->
                        new RuntimeException("Can't not update category image, category " + categoryId + " not found"));
        category.setImage(image);
        categoryRepository.save(category);
    }
}
