import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

type Props = {};

const CommentList = (props: Props) => {
    return (
        <View className="h-full pb-10">
            <FlashList
                className="py-5  h-full "
                data={new Array(20).fill(0)}
                renderItem={() => <CommentItem></CommentItem>}
                estimatedItemSize={100}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={() => (
                    <View className="h-10 w-full"></View>
                )}
            ></FlashList>

            <CommentInput></CommentInput>
        </View>
    );
};

export default CommentList;
