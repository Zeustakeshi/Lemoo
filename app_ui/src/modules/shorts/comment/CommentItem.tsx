import { CommentResponse } from "@/common/type/shorts.type";
import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import moment from "moment";
import React from "react";
import { Text, View } from "react-native";
import CommentReaction from "./CommentReaction";

type Props = {
    comment: CommentResponse;
    videoId: string;
};

const CommentItem = ({ videoId, comment }: Props) => {
    return (
        <View className="flex flex-row gap-x-2 justify-start items-start mb-4">
            <Avatar size={40}>
                <AvatarImage
                    source={{ uri: comment.user.avatar }}
                ></AvatarImage>
            </Avatar>
            <View>
                <View className="flex flex-row justify-start items-center gap-x-3">
                    <Text className="text-sm font-medium">
                        {comment.user.name}
                    </Text>
                    <Text className="text-sm  text-muded">
                        {moment(comment.updatedAt).toNow()}
                    </Text>
                </View>
                <Text className="my-2 max-w-[90%]">{comment.content}</Text>
                <CommentReaction
                    videoId={videoId}
                    comment={comment}
                ></CommentReaction>
            </View>
        </View>
    );
};

export default CommentItem;
