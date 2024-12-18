/*
 *  VideoServiceImpl
 *  @author: Minhhieuano
 *  @created 12/16/2024 9:59 PM
 * */

package com.lemoo.video.service.impl;

import com.aventrix.jnanoid.jnanoid.NanoIdUtils;
import com.lemoo.video.common.enums.VideoStatus;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.UpdateVideoMetadataRequest;
import com.lemoo.video.dto.request.UploadVideoRequest;
import com.lemoo.video.dto.response.PageableResponse;
import com.lemoo.video.dto.response.UpdateVideoResponse;
import com.lemoo.video.dto.response.VideoResponse;
import com.lemoo.video.entity.Product;
import com.lemoo.video.entity.Video;
import com.lemoo.video.exception.ForbiddenException;
import com.lemoo.video.exception.NotfoundException;
import com.lemoo.video.mapper.PageMapper;
import com.lemoo.video.mapper.VideoMapper;
import com.lemoo.video.repository.VideoRepository;
import com.lemoo.video.service.ChannelService;
import com.lemoo.video.service.VideoService;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoServiceImpl implements VideoService {

	private static final Integer MAXIMUM_VIDEO_DRAFT_PER_CHANNEL = 5;

	private final VideoRepository videoRepository;
	private final ChannelService channelService;
	private final VideoMapper videoMapper;
	private final PageMapper pageMapper;

	@Override
	public UpdateVideoResponse uploadVideo(UploadVideoRequest request, String channelId, AuthenticatedAccount account) {
		if (!channelService.canCreateVideo(channelId, account.getUserId())) {
			throw new ForbiddenException("You do not have permission to create a video.");
		}
		if (videoRepository.countByStatusAndChannelId(VideoStatus.DRAFT, channelId)
				>= MAXIMUM_VIDEO_DRAFT_PER_CHANNEL) {
			throw new ForbiddenException(
					"You have reached the maximum number of draft videos allowed. Please publish or delete existing drafts before creating a new one.");
		}

		Video video = videoRepository.save(Video.builder()
				.channelId(channelId)
				.name(NanoIdUtils.randomNanoId())
				.status(VideoStatus.DRAFT)
				.url(
						"https://res.cloudinary.com/dymmvrufy/video/upload/v1734442705/Lemoo/videos/shorts/videoplayback_wckzj5.mp4")
				.build());

		return videoMapper.toUpdateVideoResponse(video);
	}

	@Override
	public UpdateVideoResponse updateVideoMetadata(
			UpdateVideoMetadataRequest request, String videoId, String channelId, AuthenticatedAccount account) {
		Video video = videoRepository
				.findByIdAndChannelId(videoId, channelId)
				.orElseThrow(() -> new NotfoundException("Video " + videoId + " not found"));

		videoMapper.updateVideoByMetadata(request, video);

		if (request.getProducts() != null && !request.getProducts().isEmpty()) {
			video.setProducts(getProductByIds(request.getProducts()));
		} else {
			video.setProducts(Set.of());
		}

		if (request.getIsPublic()) {
			updateVideoStatus(video, VideoStatus.PUBLIC);
		} else {
			updateVideoStatus(video, VideoStatus.PRIVATE);
		}

		videoRepository.save(video);

		return videoMapper.toUpdateVideoResponse(video);
	}

	@Override
	public PageableResponse<VideoResponse> getAllByChannelId(
			String channelId, int page, int limit, AuthenticatedAccount account) {
		if (!channelService.isExistedChannel(channelId)) {
			throw new NotfoundException("Channel " + channelId + " not found");
		}

		boolean isChannelOwner = channelService.isChannelOwner(channelId, account.getUserId());

		PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

		Page<Video> videos;

		if (isChannelOwner) {
			videos = videoRepository.findAllByChannelId(channelId, request);
		} else {
			videos = videoRepository.findAllByStatusAndChannelId(VideoStatus.PUBLIC, channelId, request);
		}

		Page<VideoResponse> videoResponses = videos.map(videoMapper::toVideoResponse);

		return pageMapper.toPageableResponse(videoResponses);
	}

	private Set<Product> getProductByIds(Set<String> productIds) {
		// call api to product service to get product data
		return productIds.stream()
				.map(id -> Product.builder()
						.id(id)
						.name("test-product-" + id)
						.image(
								"https://res.cloudinary.com/dymmvrufy/image/authenticated/s--h4sU5z6N--/v1734282313/lemoo/products/images/small/675ee90131a36f4746df0e45.jpg")
						.price(10000L)
						.build())
				.collect(Collectors.toSet());
	}

	private void updateVideoStatus(Video video, VideoStatus newStatus) throws ForbiddenException {
		if (video.getStatus().equals(VideoStatus.BLOCK)) {
			throw new ForbiddenException("Can't change video status. You video has been blocked!.");
		}

		if (newStatus.equals(VideoStatus.PUBLIC) && video.getStatus().equals(VideoStatus.DRAFT)) {
			throw new ForbiddenException(
					"You can't publish a draft video. Please update the video metadata, then try to publish your video again.");
		}

		video.setStatus(newStatus);
	}
}
