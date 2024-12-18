/*
 *  VideoService
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:59 PM
 * */

package com.lemoo.video.service;

import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.UpdateVideoMetadataRequest;
import com.lemoo.video.dto.request.UploadVideoRequest;
import com.lemoo.video.dto.response.PageableResponse;
import com.lemoo.video.dto.response.UpdateVideoResponse;
import com.lemoo.video.dto.response.VideoResponse;

public interface VideoService {
    UpdateVideoResponse uploadVideo(UploadVideoRequest request, String channelId, AuthenticatedAccount account);

    UpdateVideoResponse updateVideoMetadata(
            UpdateVideoMetadataRequest request, String videoId, String channelId, AuthenticatedAccount account);

    PageableResponse<VideoResponse> getAllByChannelId(
            String channelId, int page, int limit, AuthenticatedAccount account);


}
