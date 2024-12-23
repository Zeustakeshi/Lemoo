import { getVideoComments } from "@/api/shorts.api";
import { FlashList } from "@shopify/flash-list";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";

type Props = {
    videoId: string;
};

const CommentList = ({ videoId }: Props) => {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isLoading,
        refetch,
        isRefetching,
    } = useInfiniteQuery({
        queryKey: [`video-comments-${videoId}`],
        queryFn: async ({ pageParam }) =>
            await getVideoComments(videoId, pageParam),
        getNextPageParam: (lastPage: any) => {
            if (lastPage.last) return undefined;
            return lastPage.pageNumber + 1;
        },
        initialPageParam: 0,
        gcTime: 0,
    });

    return (
        <View className="h-full pb-10">
            <FlashList
                className="py-5  h-full "
                data={data?.pages.flatMap(({ content }: any) => content ?? [])}
                renderItem={({ item }) => (
                    <CommentItem videoId={videoId} comment={item} />
                )}
                showsVerticalScrollIndicator={false}
                decelerationRate="fast"
                estimatedItemSize={200}
                initialScrollIndex={0}
                nestedScrollEnabled
                onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={5}
                ListFooterComponent={() => (
                    <View className="h-10 w-full"></View>
                )}
                refreshing={isRefetching}
                onRefresh={() => refetch()}
            ></FlashList>
            <CommentInput videoId={videoId}></CommentInput>
        </View>
    );
};

export default CommentList;
