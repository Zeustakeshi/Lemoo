import { VideoShortResponse } from "@/common/type/shorts.type";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import React from "react";
import { Text, View } from "react-native";

type Props = {
    video: VideoShortResponse;
};

const ShortVideoInfo = ({ video }: Props) => {
    return (
        <View className="absolute bottom-10 px-5 py-2 bg-slate-900/30 rounded-md w-full">
            <View className="flex flex-row gap-x-2">
                <Avatar>
                    <AvatarImage
                        source={{ uri: video.channel.avatar }}
                    ></AvatarImage>
                </Avatar>

                <View>
                    <Text className="text-white font-semibold text-lg ">
                        @{video.channel.name}
                    </Text>
                    <View>
                        <Text
                            numberOfLines={3}
                            className="text-white text-sm font-semibold max-w-[90%]"
                        >
                            {video.description}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ShortVideoInfo;
