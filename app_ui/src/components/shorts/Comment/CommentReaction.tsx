import { reactionComment, unReactionComment } from "@/api/shorts.api";
import { CommentResponse } from "@/common/type/shorts.type";
import Button from "@/components/ui/Button";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = {
    comment: CommentResponse;
    videoId: string;
};

const CommentReaction = ({ comment, videoId }: Props) => {
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isDisliked, setIsDisliked] = useState<boolean>(false);

    useEffect(() => {
        setIsLiked(comment.reaction.isLiked);
        setIsDisliked(comment.reaction.isDisliked);
    }, []);

    const { mutateAsync: reactionMutate, isPending: reactionPending } =
        useMutation({
            mutationKey: [`reaction-comment-${comment.id}`],
            mutationFn: async (type: "LIKE" | "DISLIKE") =>
                await reactionComment(videoId, comment.id, type),
        });

    const { mutateAsync: unReactionMutate, isPending: unReactionPending } =
        useMutation({
            mutationKey: [`un-reaction-comment-${comment.id}`],
            mutationFn: async () =>
                await unReactionComment(videoId, comment.id),
        });

    const handleReactionComment = async (type: "LIKE" | "DISLIKE") => {
        try {
            await reactionMutate(type);
            if (type === "LIKE") {
                setIsLiked(true);
                setIsDisliked(false);
            }
            if (type === "DISLIKE") {
                setIsDisliked(true);
                setIsLiked(false);
            }
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Tương tác bình luận thất bại",
                text2: error.message,
            });
        }
    };

    const handleUnReactionComment = async () => {
        try {
            await unReactionMutate();
            if (isLiked) setIsLiked(false);
            if (isDisliked) setIsDisliked(false);
        } catch (error: any) {
            Toast.show({
                type: "error",
                text1: "Hủy tương tác bình luận thất bại",
                text2: error.message,
            });
        }
    };

    const handleToggleLikeReaction = async () => {
        if (isLiked) await handleUnReactionComment();
        else await handleReactionComment("LIKE");
    };

    const handleToggleDisLikeReaction = async () => {
        if (isDisliked) await handleUnReactionComment();
        else await handleReactionComment("DISLIKE");
    };

    return (
        <View className="flex flex-row justify-start items-center gap-x-4">
            <Button
                onPress={handleToggleLikeReaction}
                disabled={reactionPending || unReactionPending}
                variant="ghost"
                size="icon"
            >
                {!isLiked && (
                    <MaterialCommunityIcons
                        name="thumb-up-outline"
                        size={18}
                        color="black"
                    />
                )}
                {isLiked && (
                    <MaterialCommunityIcons
                        name="thumb-up"
                        size={18}
                        color="#004CFF"
                    />
                )}
            </Button>
            <Button
                onPress={handleToggleDisLikeReaction}
                disabled={reactionPending || unReactionPending}
                variant="ghost"
                size="icon"
            >
                {!isDisliked && (
                    <MaterialCommunityIcons
                        name="thumb-down-outline"
                        size={18}
                        color="black"
                    />
                )}
                {isDisliked && (
                    <MaterialCommunityIcons
                        name="thumb-down"
                        size={18}
                        color="#004CFF"
                    />
                )}
            </Button>
            <Button variant="ghost" size="icon">
                <AntDesign name="message1" size={18} color="black" />
            </Button>
            {comment.replyCount > 0 && (
                <Button variant="link" size="icon">
                    <Text className="font-semibold text-primary">
                        {comment.replyCount} phản hồi
                    </Text>
                </Button>
            )}
        </View>
    );
};

export default CommentReaction;
