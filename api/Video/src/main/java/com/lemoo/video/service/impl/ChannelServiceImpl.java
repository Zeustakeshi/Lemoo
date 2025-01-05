/*
 *  ChannelServiceImpl
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:09 AM
 * */

package com.lemoo.video.service.impl;

import com.lemoo.video.common.enums.ChannelStatus;
import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.ChannelRequest;
import com.lemoo.video.dto.response.ChannelResponse;
import com.lemoo.video.dto.response.InternalStoreResponse;
import com.lemoo.video.entity.Channel;
import com.lemoo.video.entity.ChannelFollower;
import com.lemoo.video.exception.BadRequestException;
import com.lemoo.video.exception.ConflictException;
import com.lemoo.video.exception.ForbiddenException;
import com.lemoo.video.exception.NotfoundException;
import com.lemoo.video.mapper.ChannelMapper;
import com.lemoo.video.repository.ChannelFollowerRepository;
import com.lemoo.video.repository.ChannelRepository;
import com.lemoo.video.service.ChannelService;
import com.lemoo.video.service.StoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChannelServiceImpl implements ChannelService {

    private final ChannelRepository channelRepository;
    private final ChannelMapper channelMapper;
    private final ChannelFollowerRepository channelFollowerRepository;
    private final StoreService storeService;

    @Value("${assets.default-channel-avatar}")
    private String channelDefaultAvatar;

    @Value("${assets.default-channel-background}")
    private String channelDefaultBackground;

    @Override
    public InternalStoreResponse connectToSellerCenter(AuthenticatedAccount account) {
        InternalStoreResponse storeInfo = storeService.getStoreInfo(account.getId());
        if (storeInfo == null) throw new ForbiddenException("Store not linked. Please create a store and try again.");

        Channel channel = channelRepository.findByActiveChannelByUserId(account.getUserId())
                .orElseThrow(() ->
                        new NotfoundException("Channel not found!")
                );
        channel.setStoreId(storeInfo.getId());
        channelRepository.save(channel);
        return storeInfo;
    }

    @Override
    public ChannelResponse createChannel(ChannelRequest request, AuthenticatedAccount account) {
        if (channelRepository.existsByName(request.getName())) {
            throw new ConflictException("Channel name: " + request.getName() + " has been existed");
        }

        if (channelRepository.existsByUserId(account.getUserId())) {
            throw new ConflictException("A channel has been existed in this account.");
        }

        Channel channel = channelRepository.save(Channel.builder()
                .name(request.getName())
                .avatar(channelDefaultAvatar)
                .background(channelDefaultBackground)
                .description(request.getDescription())
                .userId(account.getUserId())
                .status(ChannelStatus.ACTIVE)
                .following(channelFollowerRepository.countByUserId(account.getUserId()))
                .build());

        return channelMapper.toChannelResponse(channel);
    }

    @Override
    public ChannelResponse updateChannel(ChannelRequest request, AuthenticatedAccount account) {
        Channel channel = channelRepository
                .findByUserId(account.getUserId())
                .orElseThrow(() -> new NotfoundException(
                        "This account does not have an existing channel. Please create a new channel."));
        channel.setDescription(request.getDescription());
        channel.setName(request.getName());
        return channelMapper.toChannelResponse(channelRepository.save(channel));
    }

    @Override
    public ChannelResponse getChannelInfo(AuthenticatedAccount account) {
        Channel channel = channelRepository
                .findByActiveChannelByUserId(account.getUserId())
                .orElseThrow(() -> new NotfoundException("Channel not found."));
        return channelMapper.toChannelResponse(channel);
    }

    @Override
    public ChannelResponse getChannelDetail(String channelId, AuthenticatedAccount account) {
        Channel channel = channelRepository
                .findByActiveChannelById(channelId)
                .orElseThrow(() -> new NotfoundException("Channel " + channelId + " not found."));
        ChannelResponse channelResponse = channelMapper.toChannelResponse(channel);
        channelResponse.setFollowed(
                channelFollowerRepository.existsByChannelIdAndUserId(channelId, account.getUserId()));
        return channelResponse;
    }

    @Override
    public List<String> getAllFollowingChannel(String userId) {
        return channelFollowerRepository.findAllByUserId(userId).stream()
                .map(ChannelFollower::getChannelId)
                .toList();
    }

    @Override
    public void followChannel(String channelId, AuthenticatedAccount account) {
        Channel channel = channelRepository
                .findByActiveChannelById(channelId)
                .orElseThrow(() -> new NotfoundException("Channel " + channelId + " not found"));

        if (channelFollowerRepository.existsByChannelIdAndUserId(channelId, account.getUserId())) {
            throw new ConflictException("You are already following this channel.");
        }

        channelFollowerRepository.save(ChannelFollower.builder()
                .channelId(channelId)
                .userId(account.getUserId())
                .build());

        channel.setFollower(channel.getFollower() + 1);
        channelRepository.save(channel);

        Optional<Channel> userChannelOptional = channelRepository.findByActiveChannelByUserId(account.getUserId());

        if (userChannelOptional.isPresent()) {
            Channel userChannel = userChannelOptional.get();
            userChannel.setFollowing(userChannel.getFollowing() + 1);
            channelRepository.save(userChannel);
        }
    }

    @Override
    public void unfollowChannel(String channelId, AuthenticatedAccount account) {
        Channel channel = channelRepository
                .findByActiveChannelById(channelId)
                .orElseThrow(() -> new NotfoundException("Channel " + channelId + " not found"));

        ChannelFollower channelFollower = channelFollowerRepository
                .findByChannelIdAndUserId(channelId, account.getUserId())
                .orElseThrow(() -> new BadRequestException("You are not following this channel."));

        channelFollowerRepository.delete(channelFollower);

        channel.setFollower(Math.max(channel.getFollower() - 1, 0));
        channelRepository.save(channel);

        Optional<Channel> userChannelOptional = channelRepository.findByActiveChannelByUserId(account.getUserId());

        if (userChannelOptional.isPresent()) {
            Channel userChannel = userChannelOptional.get();
            userChannel.setFollowing(Math.max(userChannel.getFollowing() - 1, 0));
            channelRepository.save(userChannel);
        }
    }

    @Override
    public boolean canCreateVideo(String channelId, String userId) {
        return channelRepository.existsByIdAndUserId(channelId, userId);
    }

    @Override
    public boolean isChannelOwner(String channelId, String userId) {
        return channelRepository.existsByIdAndUserId(channelId, userId);
    }

    @Override
    public boolean isExistedChannel(String channelId) {
        return channelRepository.existsById(channelId);
    }
}
