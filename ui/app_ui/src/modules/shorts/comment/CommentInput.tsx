import { createVideoComment } from "@/api/shorts.api";
import Button from "@/components/ui/Button";
import { useShortsComment } from "@/context/ShortsCommentContext";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";

type Props = { parentId?: string };

const CommentInput = ({ parentId }: Props) => {
    const [commentText, setCommentText] = useState<string>("");

    const { videoId } = useShortsComment();

    const { mutateAsync: createCommentMutate, isPending } = useMutation({
        mutationKey: [`create-comment-${videoId}-parent-${parentId}`],
        mutationFn: async (content: string) =>
            await createVideoComment(videoId, content, parentId),
    });

    const handleComment = async () => {
        const comment = commentText.trim();
        if (!comment) return;
        try {
            const data = await createCommentMutate(comment);
            setCommentText("");
        } catch (error: any) {
            console.log(error);
            Toast.show({
                type: "error",
                text1: "Bình luận thất bại",
                text2: JSON.stringify(error.message),
            });
        }
    };

    return (
        <View className=" justify-start items-center gap-x-2 flex-row py-2  border-t border-t-primary">
            <Pressable className="flex-1">
                <TextInput
                    textAlignVertical="top"
                    style={{ maxHeight: 100 }}
                    multiline
                    placeholder="Nhập bình luận ...."
                    maxLength={2000}
                    onChangeText={(text) => setCommentText(text)}
                    value={commentText}
                ></TextInput>
            </Pressable>
            <View className="flex-row justify-end items-center gap-x-2">
                <Button
                    onPress={handleComment}
                    variant="secondary"
                    className="p-4"
                    disabled={isPending}
                >
                    {!isPending && (
                        <Ionicons name="send" size={14} color="#004CFF" />
                    )}
                    {isPending && <ActivityIndicator></ActivityIndicator>}
                </Button>
            </View>
        </View>
    );
};

export default CommentInput;
