/*
 *  VideoCacheServiceImpl
 *  @author: Minhhieuano
 *  @created 1/5/2025 12:34 PM
 * */


package com.lemoo.video.service.impl;

import com.lemoo.video.common.enums.VideoStatus;
import com.lemoo.video.exception.ForbiddenException;
import com.lemoo.video.repository.VideoRepository;
import com.lemoo.video.service.VideoCacheService;
import lombok.RequiredArgsConstructor;
import org.redisson.api.RBucket;
import org.redisson.api.RedissonClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@RequiredArgsConstructor
public class VideoCacheServiceImpl implements VideoCacheService {
    private static final Logger log = LoggerFactory.getLogger(VideoCacheServiceImpl.class);
    private final VideoRepository videoRepository;
    private final RedissonClient redisson;

    @Override
    public void verifyPublicVideo(String videoId) {
        String key = generateVideoStatusKey(videoId);
        RBucket<String> bucket = redisson.getBucket(key);
        boolean isPublic;
        if (bucket.isExists()) isPublic = Integer.parseInt(bucket.get()) != 0;
        else {
            isPublic = videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC);
            saveVideoStatusAsync(videoId, isPublic);
        }
        if (!isPublic) {
            throw new ForbiddenException("You do not have permission to access this video.");
        }
    }

    @Async
    protected void saveVideoStatusAsync(String videoId, boolean isPublic) {
        try {
            String key = generateVideoStatusKey(videoId);
            RBucket<String> bucket = redisson.getBucket(key);
            bucket.set(isPublic ? "1" : "0", Duration.ofHours(1));
        } catch (Exception ex) {
            log.error("savePublicVideoAsync failed message: {}", ex.getMessage());
        }
    }


    private String generateVideoStatusKey(String videoId) {
        return "video:" + videoId + ":status";
    }
}
