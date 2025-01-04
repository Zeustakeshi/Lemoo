import { ChannelVideoResponse } from "@/common/type/shorts.type";
import { useVideoPlayer, VideoView } from "expo-video";
import React from "react";
import { Text, View } from "react-native";

type Props = { video: ChannelVideoResponse };

const ChannelVideoItem = ({ video }: Props) => {
    const player = useVideoPlayer(video.url, (player) => {
        player.loop = true;
    });

    return (
        <View className="relative w-[110px] aspect-[9/16]  rounded-md overflow-hidden m-1">
            {/* <Image
                style={{ width: "100%", height: "100%" }}
                source={{
                    uri:,
                }}
                resizeMode="cover"
            /> */}
            <VideoView
                style={{ width: "100%", height: "100%" }}
                contentFit="contain"
                player={player}
                allowsFullscreen={false}
                nativeControls={false}
                allowsPictureInPicture={false}
                showsTimecodes={false}
                allowsVideoFrameAnalysis={false}
            />
            <View className="absolute size-full top-0 left-0 z-10 bg-slate-900/50"></View>
            <View className="absolute bottom-2 left-2 z-20">
                <Text className="text-sm text-white">
                    {video.views} Lượt xem{" "}
                </Text>
            </View>
        </View>
    );
};

export default ChannelVideoItem;
