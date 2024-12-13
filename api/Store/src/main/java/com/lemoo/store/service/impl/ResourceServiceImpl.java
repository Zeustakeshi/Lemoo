/*
 *  CoudinaryServiceImpl
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:53 PM
 * */


package com.lemoo.store.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.lemoo.store.common.properties.CloudinaryProperties;
import com.lemoo.store.dto.response.ResourceUploaderResponse;
import com.lemoo.store.service.ResourceService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ResourceServiceImpl implements ResourceService {

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

        return cloudinary.apiSignRequest(options, "EB0sjDs0N22e-7gECIM3YpE_Kuo");
    }

    @Override
    public void deleteVideo(String publicId, String path) throws IOException {
        cloudinary.uploader().destroy(getCloudPath(path) + "/" + publicId, ObjectUtils.asMap("resource_type", "video"));
    }

    @Override
    public void deleteImage(String publicId, String path) throws IOException {

        cloudinary.uploader().destroy(getCloudPath(path) + "/" + publicId, ObjectUtils.asMap("resource_type", "image"));
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
