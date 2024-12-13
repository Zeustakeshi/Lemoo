/*
 *  CloudinaryService
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:52 PM
 * */

package com.lemoo.store.service;

import com.lemoo.store.dto.response.ResourceUploaderResponse;

import java.io.IOException;

public interface ResourceService {
    ResourceUploaderResponse uploadVideo(byte[] video, String publicId, String path) throws IOException;

    ResourceUploaderResponse uploadImage(byte[] image, String publicId, String path) throws IOException;

    void deleteVideo(String publicId, String path) throws IOException;

    void deleteImage(String publicId, String path) throws IOException;

    String generateSignedUrl(String publicId);
}
