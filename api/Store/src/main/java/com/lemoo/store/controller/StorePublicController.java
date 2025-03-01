/*
 *  UserStoreController
 *  @author: Minhhieuano
 *  @created 3/1/2025 8:52 PM
 * */


package com.lemoo.store.controller;

import com.lemoo.store.dto.response.ApiResponse;
import com.lemoo.store.dto.response.StorePublicResponse;
import com.lemoo.store.service.StorePublicService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/{storeId}")
@RequiredArgsConstructor
public class StorePublicController {

    private final StorePublicService storePublicService;

    @GetMapping
    public ApiResponse<StorePublicResponse> getStoreInfo(
            @PathVariable("storeId") String storeId
    ) {
        return ApiResponse.success(storePublicService.getStoreInfo(storeId));
    }

}
