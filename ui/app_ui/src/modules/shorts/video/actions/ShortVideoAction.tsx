import {
    getVideoReactions,
    reactionVideo,
    unReactionVideo,
} from "@/api/shorts.api";
import {
    ReactionResponse,
    VideoShortResponse,
} from "@/common/type/shorts.type";
import Button from "@/components/ui/Button";
import { AntDesign, Fontisto, MaterialIcons } from "@expo/vector-icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import VideoChannelAction from "./VideoChannelAction";
type Props = {
    video: VideoShortResponse;
    inView: boolean;
};

const ShortVideoAction = ({ video, inView }: Props) => {
    const [reactions, setReactions] = useState<ReactionResponse>({
        isDisliked: false,
        isLiked: false,
        dislike: 0,
        like: 0,
    });

    const { data, isPending: isFetchReactionPending } = useQuery({
        queryKey: ["video-reaction", video.id],
        queryFn: async () => await getVideoReactions(video.id),
        retry(failureCount, error) {
            return failureCount <= 2;
        },
        enabled: inView,
    });

    useEffect(() => {
        if (data) setReactions(data);
    }, [data]);

    const { mutateAsync: reactionVideoMute, isPending: isReactionPending } =
        useMutation({
            mutationKey: ["reaction-video", video.id],
            mutationFn: async (type: "LIKE" | "DISLIKE") =>
                reactionVideo(video.id, type),
        });

    const { mutateAsync: unReactionVideoMute, isPending: isUnReactionPending } =
        useMutation({
            mutationKey: ["un-reaction-video", video.id],
            mutationFn: async () => unReactionVideo(video.id),
        });

    const handleReactionVideo = async (type: "LIKE" | "DISLIKE") => {
        try {
            await reactionVideoMute(type);
            const newReactions = reactions;

            if (type === "LIKE") {
                if (reactions.isDisliked) {
                    newReactions.dislike -= 1;
                    newReactions.isDisliked = false;
                }
                newReactions.isLiked = true;
                newReactions.like += 1;
            } else {
                if (reactions.isLiked) {
                    newReactions.like -= 1;
                    newReactions.isLiked = false;
                }
                newReactions.isDisliked = true;
                newReactions.dislike += 1;
            }
        } catch (error: any) {
            Toast.show({
                text1: "Tương tác video thất bại",
                text2: error.message,
            });
        }
    };

    const handleUnReactionVideo = async (type: "LIKE" | "DISLIKE") => {
        try {
            await unReactionVideoMute();
            const newReactions = reactions;

            if (type === "LIKE") {
                newReactions.isLiked = false;
                newReactions.like -= 1;
            } else {
                newReactions.isDisliked = false;
                newReactions.dislike -= 1;
            }
        } catch (error: any) {
            Toast.show({
                text1: "Tương tác video thất bại",
                text2: error.message,
            });
        }
    };

    const handleToggleLikeReaction = async () => {
        if (reactions.isLiked) handleUnReactionVideo("LIKE");
        else handleReactionVideo("LIKE");
    };

    const handleToggleDislikeReaction = async () => {
        if (reactions.isDisliked) handleUnReactionVideo("DISLIKE");
        else handleReactionVideo("DISLIKE");
    };

    return (
        <View className="absolute justify-center items-center top-[35%] right-2 gap-y-3 z-10">
            <VideoChannelAction video={video}></VideoChannelAction>

            <View className="justify-center items-center">
                <Button variant="ghost" onPress={handleToggleLikeReaction}>
                    <Fontisto
                        name="heart"
                        size={32}
                        color={reactions.isLiked ? "#e11d48" : "white"}
                    />
                </Button>
                <Text className="text-white text-sm font-semibold ">
                    {reactions?.like ?? 0}
                </Text>
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
                <Button variant="ghost" onPress={handleToggleDislikeReaction}>
                    <AntDesign
                        name="dislike1"
                        size={32}
                        color={reactions.isDisliked ? "#004CFF" : "white"}
                    />
                </Button>
                <Text className="text-white text-sm font-semibold">
                    {reactions?.dislike ?? 0}
                </Text>
            </View>
        </View>
    );
};

export default ShortVideoAction;
