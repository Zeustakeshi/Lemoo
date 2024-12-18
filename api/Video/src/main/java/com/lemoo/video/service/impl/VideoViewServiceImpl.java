/*
 *  VideoViewServiceImpl
 *  @author: Minhhieuano
 *  @created 12/18/2024 3:05 PM
 * */


package com.lemoo.video.service.impl;

import com.lemoo.video.common.enums.ReactionType;
import com.lemoo.video.common.enums.VideoStatus;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.response.PageableResponse;
import com.lemoo.video.dto.response.ReactionResponse;
import com.lemoo.video.dto.response.VideoViewResponse;
import com.lemoo.video.entity.Channel;
import com.lemoo.video.entity.Video;
import com.lemoo.video.entity.VideoReaction;
import com.lemoo.video.exception.NotfoundException;
import com.lemoo.video.mapper.ChannelMapper;
import com.lemoo.video.mapper.PageMapper;
import com.lemoo.video.mapper.VideoMapper;
import com.lemoo.video.repository.ChannelRepository;
import com.lemoo.video.repository.VideoReactionRepository;
import com.lemoo.video.repository.VideoRepository;
import com.lemoo.video.service.ChannelService;
import com.lemoo.video.service.VideoViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class VideoViewServiceImpl implements VideoViewService {
    private final ChannelRepository channelRepository;
    private final VideoRepository videoRepository;
    private final PageMapper pageMapper;
    private final ChannelMapper channelMapper;
    private final VideoMapper videoMapper;
    private final ChannelService channelService;
    private final VideoReactionRepository videoReactionRepository;

    @Override
    public PageableResponse<VideoViewResponse> getRecommendVideo(int page, int limit, AuthenticatedAccount account) {
        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));

        Channel channel = channelRepository.findByUserId(account.getUserId())
                .orElse(Channel.builder().id(null).build());

        Page<Video> videos = videoRepository.findAllByStatusAndChannelIdNotLike(VideoStatus.PUBLIC, channel.getId(), request);
        return pageMapper.toPageableResponse(mapPageVideoToPageViewResponse(videos));
    }


    @Override
    public PageableResponse<VideoViewResponse> getFollowingVideo(int page, int limit, AuthenticatedAccount account) {

        List<String> followingChannels = channelService.getAllFollowingChannel(account.getUserId());

        PageRequest request = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "updatedAt"));
        Page<Video> videos = videoRepository.findAllByChannelIdIn(followingChannels, request);

        return pageMapper.toPageableResponse(mapPageVideoToPageViewResponse(videos));
    }


    @Override
    public ReactionResponse getVideoReaction(String videoId, AuthenticatedAccount account) {
        if (!videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC)) {
            throw new NotfoundException("Video " + videoId + " not found");
        }

        var response = ReactionResponse.builder()
                .like(videoReactionRepository.countByVideoIdAndType(videoId, ReactionType.LIKE))
                .dislike(videoReactionRepository.countByVideoIdAndType(videoId, ReactionType.DISLIKE))
                .build();

        videoReactionRepository.findByUserIdAndVideoId(account.getUserId(), videoId)
                .ifPresent((reaction) -> {
                    response.setLiked(reaction.getType().equals(ReactionType.LIKE));
                    response.setDisliked(reaction.getType().equals(ReactionType.DISLIKE));
                });

        return response;
    }

    @Override
    public boolean reactionVideo(ReactionType reactionType, String videoId, AuthenticatedAccount account) {
        if (!videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC)) {
            throw new NotfoundException("Video " + videoId + " not found");
        }

        var videoReactionOptional = videoReactionRepository.findByUserIdAndVideoId(account.getUserId(), videoId);

        VideoReaction videoReaction;

        if (videoReactionOptional.isPresent()) {
            videoReaction = videoReactionOptional.get();
            if (videoReaction.getType().equals(reactionType)) return false;
            videoReaction.setType(reactionType);
        } else {
            videoReaction = VideoReaction.builder()
                    .videoId(videoId)
                    .userId(account.getUserId())
                    .type(reactionType)
                    .build();
        }

        videoReactionRepository.save(videoReaction);

        return true;
    }

    @Override
    public boolean unReactionVideo(String videoId, AuthenticatedAccount account) {
        if (!videoRepository.existsByIdAndStatus(videoId, VideoStatus.PUBLIC)) {
            throw new NotfoundException("Video " + videoId + " not found");
        }

        var videoReactionOptional = videoReactionRepository.findByUserIdAndVideoId(account.getUserId(), videoId);

        if (videoReactionOptional.isEmpty()) return false;

        var videoReaction = videoReactionOptional.get();

        videoReactionRepository.delete(videoReaction);

        return true;
    }

    private Page<VideoViewResponse> mapPageVideoToPageViewResponse(Page<Video> videos) {
        return videos.map(video -> {
            var response = videoMapper.toVideoViewResponse(video);
            Channel channel = channelRepository.findByActiveChannelById(video.getChannelId())
                    .orElseThrow(() -> new NotfoundException("Channel " + video.getChannelId() + " not found"));
            response.setChannel(channelMapper.toChannelBasicInfoResponse(channel));
            return response;
        });
    }
}
