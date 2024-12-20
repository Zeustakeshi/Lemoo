import { ChannelResponse } from "@/common/type/shorts.type";
import { api } from "@/lib/api";
import { CreateChannelType } from "@/schema/channel.schema";

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
