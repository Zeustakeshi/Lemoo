import { getRecommendFriend } from "@/api/friend.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import React from "react";
import { FlatList, Text, View } from "react-native";
import FriendRecommendCard from "./FriendRecommendCard";

type Props = {};

const FriendRecommendList = (props: Props) => {
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
        <FlatList
            refreshing={isLoading}
            onRefresh={() => {
                console.log("refresh");
                refetch();
            }}
            className=""
            initialNumToRender={10}
            renderItem={({ item }) => <FriendRecommendCard user={item} />}
            data={data?.pages.flatMap(({ content }: any) => content ?? [])}
            showsVerticalScrollIndicator={false}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={() => {
                return (
                    <View className="flex-1 justify-center items-center min-h-[150px]">
                        <Text className="text-sm text-slate-800">
                            Bạn chưa có học phần nào
                        </Text>
                    </View>
                );
            }}
            ListFooterComponent={() => <View className="h-[100px] "></View>}
            onEndReachedThreshold={5}
        ></FlatList>
    );
};

export default FriendRecommendList;
