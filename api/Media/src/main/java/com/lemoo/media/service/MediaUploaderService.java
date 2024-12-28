/*
 *  CloudinaryService
 *  @author: Minhhieuano
 *  @created 12/10/2024 1:52 PM
 * */

package com.lemoo.media.service;

import com.lemoo.media.dto.response.ResourceUploaderResponse;
import java.io.IOException;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import org.springframework.web.multipart.MultipartFile;

public interface MediaUploaderService {

	ResourceUploaderResponse uploadImage(byte[] image, String publicId, String path) throws IOException;

	CompletableFuture<ResourceUploaderResponse> uploadImageAsync(byte[] image, String publicId, String path);

	ResourceUploaderResponse uploadVideo(byte[] video, String publicId, String path) throws IOException;

	CompletableFuture<ResourceUploaderResponse> uploadVideoAsync(byte[] video, String publicId, String path);

	String deleteVideo(String publicId, String path) throws IOException;

	CompletableFuture<String> deleteVideoAsync(String publicId, String path);

	List<String> deleteImages(List<String> publicIds, String path) throws Exception;

	CompletableFuture<List<String>> deleteImagesAsync(List<String> publicIds, String path);

	String generateSignedUrl(String publicId);

	byte[] ConvertMultipartToByte(MultipartFile file);
}
