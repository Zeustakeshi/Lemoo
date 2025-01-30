import { followChannel } from "@/api/channel.api";
import { VideoShortResponse } from "@/common/type/shorts.type";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { AntDesign } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
    video: VideoShortResponse;
};

const VideoChannelAction = ({ video }: Props) => {
    const [isFollowing, setFollowing] = useState<boolean>(
        video.channel.isFollowed
    );

    const { mutateAsync: followChannelMutate, isPending } = useMutation({
        mutationKey: ["folllow-channel", video.channel.id],
        mutationFn: async () => await followChannel(video.channel.id),
    });

    useEffect(() => {
        setFollowing(video.channel.isFollowed);
    }, []);

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
    );
};

export default VideoChannelAction;
