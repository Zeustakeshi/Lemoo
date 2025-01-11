import { followChannel, unfollowChannel } from "@/api/channel.api";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { RootState } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Image, Text, View } from "react-native";
import Modal from "react-native-modal";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

type Props = {
    isSelf: boolean;
};

const ChannelProfile = ({ isSelf }: Props) => {
    const { channel } = useSelector((state: RootState) => state.channel);
    const [isFollowing, setFollowing] = useState<boolean>(
        channel?.isFollowed ?? false
    );
    const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
    const [follower, setFollower] = useState<number>(channel?.follower ?? 0);

    const { mutateAsync: followChannelMutate, isPending: isFollowPending } =
        useMutation({
            mutationKey: ["folllow-channel", channel?.id],
            mutationFn: async () => await followChannel(channel?.id as string),
        });

    const { mutateAsync: unfollowChannelMutate, isPending: isUnfollowPending } =
        useMutation({
            mutationKey: ["unfolllow-channel", channel?.id],
            mutationFn: async () =>
                await unfollowChannel(channel?.id as string),
        });

    const handleFollowChannel = async () => {
        if (isFollowing) return;
        try {
            await followChannelMutate();
            setFollowing(true);
            setFollower((follower) => follower + 1);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Theo dõi kênh thất bại",
                text2: error.message,
            });
        }
    };

    const handleUnfollowChannel = async () => {
        if (!isFollowing) return;
        try {
            await unfollowChannelMutate();
            setFollowing(false);
            setFollower((follower) => follower - 1);
            setShowConfirmModal(false);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Hủy theo dõi kênh thất bại",
                text2: error.message,
            });
        }
    };

    const handleToggleFollowChannel = async () => {
        if (isFollowing) setShowConfirmModal(true);
        else await handleFollowChannel();
    };

    return (
        <View
            className={cn("relative h-[190] ", {
                "h-[180]": isSelf,
            })}
        >
            <Image
                className="w-full h-full object-cover"
                source={{ uri: channel?.background }}
            ></Image>

            <View className="absolute top-0 left-0 size-full bg-slate-900/80"></View>

            <View className="absolute size-full top-0 left-0 p-4  z-20">
                <View className="">
                    <View className="flex-row justify-start items-start gap-x-4">
                        <Avatar variant="square" size={80}>
                            <AvatarImage
                                source={{ uri: channel?.avatar }}
                            ></AvatarImage>
                        </Avatar>
                        <View className="items-start">
                            <Text className="text-xl font-semibold my-2 text-center text-white line-clamp-">
                                @{channel?.name}
                            </Text>
                            <View className="mb-4 mt-2 flex-row justify-center items-center gap-x-5">
                                <View className="justify-center items-center ">
                                    <Text className="text-xl font-semibold text-white">
                                        {channel?.following}
                                    </Text>
                                    <Text className="text-white text-center text-sm">
                                        Đang theo dõi
                                    </Text>
                                </View>

                                <View className="justify-center items-center">
                                    <Text className="text-xl font-semibold text-white">
                                        {follower}
                                    </Text>
                                    <Text className="text-white text-center text-sm">
                                        Người theo dõi
                                    </Text>
                                </View>
                            </View>
                            {!isSelf && (
                                <View className=" flex flex-row justify-center items-center gap-x-3">
                                    <Button
                                        onPress={handleToggleFollowChannel}
                                        disabled={
                                            isFollowPending || isUnfollowPending
                                        }
                                        className={cn("flex-1 py-3", {
                                            "bg-primary": !isFollowing,
                                            "!bg-transparent border border-white":
                                                isFollowing,
                                        })}
                                    >
                                        <Text className="text-white">
                                            {isFollowing
                                                ? "Hủy theo dõi"
                                                : "Theo dõi"}
                                        </Text>
                                    </Button>
                                </View>
                            )}
                        </View>
                    </View>
                </View>
            </View>

            <Modal
                animationIn="bounceIn"
                animationOut="bounceOut"
                isVisible={showConfirmModal}
                backdropOpacity={0.6}
            >
                <View className=" bg-white p-5 rounded-md min-h-[180]">
                    <Text className="font-semibold text-xl my-3 text-center">
                        Hủy theo dõi
                    </Text>
                    <Text className="text-center text-sm text-muded mt-3 mb-8">
                        Kênh này sẽ bị xóa khỏi danh sách đang theo dõi của bạn
                    </Text>
                    <View className="flex-row justify-between items-center gap-3">
                        <Button
                            className="flex-1"
                            variant="secondary"
                            onPress={() => setShowConfirmModal(false)}
                        >
                            <Text>Bỏ qua</Text>
                        </Button>
                        <Button
                            className="flex-1"
                            disabled={isUnfollowPending}
                            onPress={handleUnfollowChannel}
                        >
                            <Text className="text-white">Hủy theo dõi</Text>
                        </Button>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ChannelProfile;
