/*
 *  InternalMediaController
 *  @author: Minhhieuano
 *  @created 3/11/2025 11:21 AM
 * */


package com.lemoo.media.controller;

import com.lemoo.media.dto.response.ApiResponse;
import com.lemoo.media.service.InternalMediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/internal")
@RequiredArgsConstructor
public class InternalMediaController {
    private final InternalMediaService internalMediaService;

    @PostMapping("images/batch")
    public ApiResponse<Map<String, String>> batchGetImageMediaUrl(
            @RequestBody Set<String> mediaIds,
            @RequestHeader("x-store-id") String storeId
    ) {
        return ApiResponse.success(internalMediaService.batchGetImageMediaUrl(mediaIds, storeId));
    }
}
