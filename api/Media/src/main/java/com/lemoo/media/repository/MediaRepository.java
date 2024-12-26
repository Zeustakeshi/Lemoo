/*
 *  MediaRepository
 *  @author: Minhhieuano
 *  @created 12/26/2024 1:27 AM
 * */


package com.lemoo.media.repository;

import com.lemoo.media.common.enums.MediaType;
import com.lemoo.media.entity.BaseMedia;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MediaRepository extends MongoRepository<BaseMedia, String> {
    Optional<BaseMedia> findByPublicId(String publicId);

    boolean existsByIdAndStoreId(String id, String storeId);

    Page<BaseMedia> findAllByStoreIdAndType(String storeId, MediaType type, Pageable pageable);

    Optional<BaseMedia> findByStoreIdAndUserId(String storeId, String userId);
}
