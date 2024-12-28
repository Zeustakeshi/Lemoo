/*
 *  CoudinaryServiceImpl
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:53 PM
 * */

package com.lemoo.media.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.lemoo.media.common.properties.CloudinaryProperties;
import com.lemoo.media.dto.response.ResourceUploaderResponse;
import com.lemoo.media.service.MediaUploaderService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class MediaUploaderServiceImpl implements MediaUploaderService {

    private final Cloudinary cloudinary;
    private final CloudinaryProperties cloudinaryProperties;

    @Override
    public ResourceUploaderResponse uploadImage(byte[] file, String publicId, String path) throws IOException {

        Map<?, ?> configs = ObjectUtils.asMap(
                "resource_type",
                "image",
                "folder",
                getCloudPath(path),
                "public_id",
                publicId,
                "overwrite",
                true,
                "type",
                "authenticated",
                "allowed_formats",
                "jpg,png,gif,webp");

        return upload(file, configs);
    }

    @Override
    @Async
    public CompletableFuture<ResourceUploaderResponse> uploadImageAsync(byte[] file, String publicId, String path) {
        try {
            return CompletableFuture.completedFuture(uploadImage(file, publicId, path));
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public ResourceUploaderResponse uploadVideo(byte[] video, String publicId, String path) throws IOException {

        Map<?, ?> configs = ObjectUtils.asMap(
                "resource_type",
                "video",
                "folder",
                getCloudPath(path),
                "public_id",
                publicId,
                "overwrite",
                true,
                "type",
                "authenticated",
                "allowed_formats",
                "mp4");

        return upload(video, configs);
    }

    @Override
    @Async
    public CompletableFuture<ResourceUploaderResponse> uploadVideoAsync(byte[] video, String publicId, String path) {
        try {
            return CompletableFuture.completedFuture(uploadVideo(video, publicId, path));
        } catch (IOException exception) {
            throw new RuntimeException(exception);
        }
    }

    @Override
    public String generateSignedUrl(String publicId) {

        Instant now = Instant.now();

        Map options = ObjectUtils.asMap(
                "resource_type",
                "image",
                "type",
                "authenticated",
                "expires_at",
                now.plus(cloudinaryProperties.secureUrlExpireIn(), ChronoUnit.HOURS)
                        .toEpochMilli());

        return cloudinary.apiSignRequest(options, cloudinaryProperties.apiSecret());
    }

    @Override
    @SneakyThrows
    public byte[] ConvertMultipartToByte(MultipartFile file) {
        return file.getBytes();
    }

    @Override
    public String deleteVideo(String publicId, String path) throws IOException {
        cloudinary.uploader().destroy(getCloudPath(path) + "/" + publicId, ObjectUtils.asMap("resource_type", "video"));
        return publicId;
    }

    @Override
    @Async
    public CompletableFuture<String> deleteVideoAsync(String publicId, String path) {
        try {
            return CompletableFuture.completedFuture(deleteVideo(publicId, path));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public List<String> deleteImages(List<String> publicIds, String path) throws Exception {
        cloudinary.api().deleteResources(publicIds.stream().map(id -> getCloudPath(path) + "/" + id).toList(), ObjectUtils.asMap("resource_type", "image", "type", "authenticated"));
        return publicIds;
    }

    @Override
    @Async
    public CompletableFuture<List<String>> deleteImagesAsync(List<String> publicIds, String path) {
        try {
            return CompletableFuture.completedFuture(deleteImages(publicIds, path));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    private ResourceUploaderResponse upload(byte[] file, Map<?, ?> configs) throws IOException {
        Map<?, ?> uploadResult = cloudinary.uploader().upload(file, configs);
        return ResourceUploaderResponse.builder()
                .publicId(uploadResult.get("public_id").toString())
                .etag(uploadResult.get("etag").toString())
                .format(uploadResult.get("format").toString())
                .width(Long.parseLong(uploadResult.get("width").toString()))
                .height(Long.parseLong(uploadResult.get("height").toString()))
                .resourceType(uploadResult.get("resource_type").toString())
                .secureUrl(uploadResult.get("secure_url").toString())
                .url(uploadResult.get("url").toString())
                .version(Long.parseLong(uploadResult.get("version").toString()))
                .signature(uploadResult.get("signature").toString())
                .build();
    }

    private String getCloudPath(String path) {
        return cloudinaryProperties.dirPrefix() + (path.startsWith("/") ? path : "/" + path);
    }
}
