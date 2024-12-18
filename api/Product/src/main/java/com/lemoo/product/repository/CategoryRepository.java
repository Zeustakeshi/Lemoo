/*
 *  CategoryRepository
 *  @author: Minhhieuano
 *  @created 12/14/2024 12:13 AM
 * */

package com.lemoo.product.repository;

import com.lemoo.product.entity.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
	boolean existsByNameAndParentId(String name, String parentId);

	Page<Category> findAllByParentId(String parentId, Pageable pageable);
}
