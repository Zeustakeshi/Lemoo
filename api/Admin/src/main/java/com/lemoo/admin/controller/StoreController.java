/*
 *  StoreController
 *  @author: Minhhieuano
 *  @created 1/29/2025 11:31 AM
 * */


package com.lemoo.admin.controller;

import com.lemoo.admin.common.enums.StoreStatus;
import com.lemoo.admin.dto.response.ApiResponse;
import com.lemoo.admin.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/stores")
@RequiredArgsConstructor
public class StoreController {
    private final StoreService storeService;

    @GetMapping
    public ApiResponse<?> getAllStoreByStatus(
            @RequestParam(value = "status", required = false, defaultValue = "PENDING") StoreStatus status,
            @RequestParam(value = "page", required = false, defaultValue = "0") int page,
            @RequestParam(value = "limit", required = false, defaultValue = "10") int limit
    ) {
        return ApiResponse.success(storeService.getAllStoreByStatus(status, page, limit));
    }

    @PostMapping("/{storeId}/activate")
    public ApiResponse<?> activateStore(
            @PathVariable("storeId") String storeId
    ) {
        return ApiResponse.success(storeService.activateStore(storeId));
    }

    @PostMapping("/{storeId}/deactivate")
    public ApiResponse<?> deactivateStore(
            @PathVariable("storeId") String storeId
    ) {
        return ApiResponse.success(storeService.deactivateStore(storeId));
    }


}
