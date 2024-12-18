/*
 *  ChannelService
 *  @author: Minhhieuano
 *  @created 12/17/2024 12:09 AM
 * */

package com.lemoo.video.service;

import com.lemoo.video.dto.common.AuthenticatedAccount;
import com.lemoo.video.dto.request.ChannelRequest;
import com.lemoo.video.dto.response.ChannelResponse;

import java.util.List;

public interface ChannelService {
    ChannelResponse createChannel(ChannelRequest request, AuthenticatedAccount account);

    ChannelResponse updateChannel(ChannelRequest request, AuthenticatedAccount account);

    ChannelResponse getChannelDetail(String channelId, AuthenticatedAccount account);

    List<String> getAllFollowingChannel(String userId);

    void followChannel(String channelId, AuthenticatedAccount account);

    void unfollowChannel(String channelId, AuthenticatedAccount account);

    boolean canCreateVideo(String channelId, String userId);

    boolean isChannelOwner(String channelId, String userId);

    boolean isExistedChannel(String channelId);
}
