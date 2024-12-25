/*
 *  CloudinaryService
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:52 PM
 * */

package com.lemoo.product.service;

import com.lemoo.product.dto.response.ResourceUploaderResponse;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;

public interface ResourceService {
    ResourceUploaderResponse uploadVideo(byte[] video, String publicId, String path) throws IOException;

    ResourceUploaderResponse uploadImage(byte[] image, String publicId, String path) throws IOException;

    CompletableFuture<ResourceUploaderResponse> uploadImageAsync(byte[] image, String publicId, String path);

    void deleteVideo(String publicId, String path) throws IOException;

    void deleteImages(List<String> publicIds, String path) throws IOException;

    String generateSignedUrl(String publicId);

    byte[] ConvertMultipartToByte(MultipartFile file);
}
