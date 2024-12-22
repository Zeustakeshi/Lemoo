import { followChannel } from "@/api/channel.api";
import { VideoShortResponse } from "@/common/type/shorts.type";
import {
    AntDesign,
    FontAwesome5,
    Fontisto,
    MaterialIcons,
} from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Avatar, { AvatarImage } from "../../ui/Avatar";
import Button from "../../ui/Button";
type Props = {
    video: VideoShortResponse;
};

const ShortVideoAction = ({ video }: Props) => {
    const [isFollowing, setFollowing] = useState<boolean>(
        video.channel.isFollowed
    );

    useEffect(() => {
        setFollowing(video.channel.isFollowed);
    }, []);

    const { mutateAsync: followChannelMutate, isPending } = useMutation({
        mutationKey: ["folllow-channel", video.channel.id],
        mutationFn: async () => await followChannel(video.channel.id),
    });

    const handleFollowChannel = async () => {
        if (isFollowing) return;
        try {
            await followChannelMutate();
            setFollowing(true);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Theo dõi kênh thất bại",
                text2: error.message,
            });
        }
    };

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
                {!isFollowing && (
                    <Button
                        onPress={handleFollowChannel}
                        disabled={isPending}
                        size="icon"
                        className="my-1 w-max"
                    >
                        <AntDesign name="plus" size={14} color="white" />
                    </Button>
                )}
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
