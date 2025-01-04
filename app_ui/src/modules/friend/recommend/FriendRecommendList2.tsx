import { getRecommendFriend } from "@/api/friend.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, View } from "react-native";
import FriendRecommendCard from "./FriendRecommendCard";

type Props = {};

const FriendRecommendList2 = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
        useInfiniteQuery({
            queryKey: ["friend-recommend"],
            queryFn: async ({ pageParam }) =>
                await getRecommendFriend(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    return (
        <View>
            <FlatList
                refreshing={isLoading}
                data={data?.pages.flatMap(({ content }: any) => content ?? [])}
                renderItem={({ item }) => <FriendRecommendCard user={item} />}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={() => <View className="h-[100]"></View>}
                onEndReached={() => {
                    if (hasNextPage) fetchNextPage();
                }}
                onEndReachedThreshold={5}
                onRefresh={() => {
                    refetch();
                }}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

export default FriendRecommendList2;
