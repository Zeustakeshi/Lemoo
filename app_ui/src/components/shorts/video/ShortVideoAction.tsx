import { VideoShortResponse } from "@/common/type/shorts.type";
import { useAuth } from "@/context/AuthContext";
import {
    AntDesign,
    FontAwesome5,
    Fontisto,
    MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import Avatar, { AvatarImage } from "../../ui/Avatar";
import Button from "../../ui/Button";
type Props = {
    video: VideoShortResponse;
};

const ShortVideoAction = ({ video }: Props) => {
    const { user } = useAuth();

    return (
        <View className="absolute justify-center items-center top-[38%] right-2 gap-y-3 z-10">
            <Pressable
                onPress={() => {
                    router.push({
                        pathname: "/shorts/channel/[channelId]",
                        params: { channelId: video.channel.id },
                    });
                }}
                className="relative"
            >
                <Avatar size={50}>
                    <AvatarImage
                        source={{ uri: video.channel.avatar }}
                    ></AvatarImage>
                </Avatar>
                <Button size="icon" className="my-1 w-max">
                    <AntDesign name="plus" size={14} color="white" />
                </Button>
            </Pressable>

            <View className="justify-center items-center">
                <Button variant="ghost">
                    <Fontisto name="heart" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">2k</Text>
            </View>

            <View className=" justify-center items-center flex-1">
                <Button
                    onPress={() =>
                        router.push({
                            pathname: "/shorts/comments/[id]",
                            params: {
                                id: video.id,
                            },
                        })
                    }
                    variant="ghost"
                >
                    <MaterialIcons name="comment" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">2</Text>
            </View>

            <View className="justify-center items-center">
                <Button variant="ghost">
                    <FontAwesome5 name="share" size={32} color="white" />
                </Button>
                <Text className="text-white text-sm font-semibold">100</Text>
            </View>
        </View>
    );
};

export default ShortVideoAction;
