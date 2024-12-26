/*
 *  ProductMediaServiceImpl
 *  @author: Minhhieuano
 *  @created 12/26/2024 1:26 AM
 * */


package com.lemoo.media.service.impl;

import com.lemoo.media.client.StoreClient;
import com.lemoo.media.common.enums.MediaType;
import com.lemoo.media.dto.common.AuthenticatedAccount;
import com.lemoo.media.dto.request.UploadImageRequest;
import com.lemoo.media.dto.request.VerifyStoreRequest;
import com.lemoo.media.dto.response.MediaResponse;
import com.lemoo.media.dto.response.PageableResponse;
import com.lemoo.media.dto.response.ResourceUploaderResponse;
import com.lemoo.media.entity.BaseMedia;
import com.lemoo.media.exception.ForbiddenException;
import com.lemoo.media.exception.NotfoundException;
import com.lemoo.media.mapper.MediaMapper;
import com.lemoo.media.mapper.PageMapper;
import com.lemoo.media.repository.MediaRepository;
import com.lemoo.media.service.MediaUploaderService;
import com.lemoo.media.service.StoreMediaService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class StoreMediaServiceImpl implements StoreMediaService {
    private static final String STORE_CLOUD_PATH = "/stores/";


    private final MediaUploaderService uploaderService;
    private final MediaRepository mediaRepository;
    private final StoreClient storeClient;
    private final MediaMapper mediaMapper;
    private final PageMapper pageMapper;

    @Override
    public PageableResponse<MediaResponse> getAllImageByStoreId(String storeId, AuthenticatedAccount account, int page, int limit) {
        verifyStore(account.getId(), storeId);

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Page<BaseMedia> media = mediaRepository.findAllByStoreIdAndType(storeId, MediaType.IMAGE, request);

        return pageMapper.toPageableResponse(media.map(mediaMapper::toMediaResponse));
    }

    @Override
    @SneakyThrows
    public MediaResponse uploadImage(String storeId, AuthenticatedAccount account, UploadImageRequest request) {

        verifyStore(account.getId(), storeId);

        var uploadResponse = uploaderService.uploadImage(request.getImage().getBytes(), storeId, STORE_CLOUD_PATH);

        var media = saveStoreMedia(storeId, account.getUserId(), MediaType.IMAGE, uploadResponse);


        return mediaMapper.toMediaResponse(media);
    }

    @Override
    @SneakyThrows
    public void uploadImageAsync(String storeId, AuthenticatedAccount account, UploadImageRequest request) {
        verifyStore(account.getId(), storeId);

        uploaderService.uploadImageAsync(request.getImage().getBytes(), storeId, STORE_CLOUD_PATH)
                .thenAccept((data) -> {
                    saveStoreMedia(storeId, account.getUserId(), MediaType.IMAGE, data);
                });
    }

    @Override
    @SneakyThrows
    public void deleteImage(String imageId, String storeId, AuthenticatedAccount account) {
        if (!mediaRepository.existsById(imageId)) {
            throw new NotfoundException("Image not found in media center");
        }
        verifyStore(account.getId(), storeId);
        uploaderService.deleteImages(List.of(imageId), STORE_CLOUD_PATH);
        mediaRepository.deleteById(imageId);
    }

    public void deleteImageAsync(String imageId, String storeId, AuthenticatedAccount account) {
        if (!mediaRepository.existsByIdAndStoreId(imageId, storeId)) {
            throw new NotfoundException("Image not found in media center");
        }
        verifyStore(account.getId(), storeId);

        uploaderService.deleteImagesAsync(List.of(imageId), STORE_CLOUD_PATH)
                .thenAccept((data) -> {
                    mediaRepository.deleteById(imageId);
                });
    }

    private void verifyStore(String accountId, String storeId) {
        var verityStoreResponse = storeClient.verifyStore(new VerifyStoreRequest(accountId, storeId));

        if (!verityStoreResponse.getData()) {
            throw new ForbiddenException(verityStoreResponse.getErrors().toString());
        }
    }

    private BaseMedia saveStoreMedia(String storeId, String userId, MediaType type, ResourceUploaderResponse uploaderResponse) {
        return mediaRepository.save(BaseMedia.builder()
                .storeId(storeId)
                .userId(userId)
                .type(type)
                .url(uploaderResponse.getUrl())
                .publicId(uploaderResponse.getPublicId())
                .build());
    }

    private String getStoreImageKey(String storeId) {
        return "media:store:" + storeId + ":image";
    }
}
