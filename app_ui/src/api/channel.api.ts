import { Pageable } from "@/common/type/page.type";
import {
    ChannelResponse,
    ChannelVideoResponse,
} from "@/common/type/shorts.type";
import { api } from "@/lib/api";
import {
    CreateChannelType,
    UpdateVideoMetadataType,
} from "@/schema/channel.schema";
import FormData from "form-data";

export const getChannelInfo = async (): Promise<ChannelResponse> => {
    return await api.get("/videos/channels/me");
};

export const getChannelDetail = async (
    channelId: string
): Promise<ChannelResponse> => {
    return await api.get(`/videos/channels/${channelId}`);
};

export const createChannel = async (data: CreateChannelType) => {
    return await api.post("/videos/channels", data);
};

export const uploadVideo = async (channelId: string, data: FormData) => {
    return await api.post(`/videos/${channelId}/shorts/upload`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
            ...data.getHeaders?.(),
        },
    });
};

export const updateVideoMetadata = async (
    channelId: string,
    videoId: string,
    data: UpdateVideoMetadataType
) => {
    return await api.put(
        `/videos/${channelId}/shorts/${videoId}/metadata`,
        data
    );
};

export const getChannelVideos = async (
    channelId: string,
    page: number
): Promise<Pageable<ChannelVideoResponse>> => {
    return await api.get(`videos/${channelId}/shorts`, {
        params: {
            page,
            limit: 9,
        },
    });
};

export const followChannel = async (channelId: string) => {
    return await api.post(`/videos/channels/${channelId}/follow`);
};

export const unfollowChannel = async (channelId: string) => {
    return await api.delete(`/videos/channels/${channelId}/follow`);
};
