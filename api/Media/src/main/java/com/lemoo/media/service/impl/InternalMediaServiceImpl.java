/*
 *  InternalMediaServiceImpl
 *  @author: Minhhieuano
 *  @created 3/11/2025 11:22 AM
 * */


package com.lemoo.media.service.impl;

import com.lemoo.media.common.enums.MediaType;
import com.lemoo.media.entity.BaseMedia;
import com.lemoo.media.repository.MediaRepository;
import com.lemoo.media.service.InternalMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class InternalMediaServiceImpl implements InternalMediaService {

    private final MediaRepository mediaRepository;

    @Override
    public Map<String, String> batchGetImageMediaUrl(Set<String> mediaIds, String storeId) {
        Map<String, String> result = new HashMap<>();

        List<BaseMedia> mediaList = mediaRepository.findAllByStoreIdAndType(storeId, MediaType.IMAGE);

        mediaList.forEach(media -> {
            if (mediaIds.contains(media.getId())) {
                result.put(media.getId(), media.getUrl());
            }
        });

        return result;
    }


}
