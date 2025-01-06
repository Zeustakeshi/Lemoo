import { useShortsComment } from "@/context/ShortsCommentContext";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";
import CommentItem from "./CommentItem";

type Props = {};

const CommentList = ({}: Props) => {
    const {
        videoId,
        comments,
        hasNextPage,
        fetchNextPage,
        isRefetching,
        refetch,
    } = useShortsComment();

    return (
        <FlashList
            className="py-5 "
            data={comments?.pages.flatMap(({ content }: any) => content ?? [])}
            renderItem={({ item }) => (
                <View>
                    <CommentItem videoId={videoId} comment={item} />
                </View>
            )}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            estimatedItemSize={200}
            initialScrollIndex={0}
            nestedScrollEnabled
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={20}
            ListFooterComponent={() => <View className="h-10 w-full"></View>}
            refreshing={isRefetching}
            onRefresh={() => refetch()}
        ></FlashList>
    );
};

export default CommentList;
