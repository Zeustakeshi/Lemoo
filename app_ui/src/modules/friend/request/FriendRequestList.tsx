import { getFriendInvitations } from "@/api/friend.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import LottieView from "lottie-react-native";
import React from "react";
import { FlatList, View } from "react-native";
import FriendRequestCard from "./FriendRequestCard";

type Props = {};

const FriendRequestList = (props: Props) => {
    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
        useInfiniteQuery({
            queryKey: ["friend-invitation"],
            queryFn: async ({ pageParam }) =>
                await getFriendInvitations(pageParam),
            getNextPageParam: (lastPage: any) => {
                if (lastPage.last) return undefined;
                return lastPage.pageNumber + 1;
            },
            initialPageParam: 0,
        });

    return (
        <FlatList
            refreshing={isFetchingNextPage}
            data={data?.pages.flatMap(({ content }: any) => content ?? [])}
            renderItem={({ item }) => <FriendRequestCard user={item} />}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={() => (
                <View className="flex-1 justify-center items-center h-[400]">
                    {isFetchingNextPage && (
                        <LottieView
                            style={{
                                width: 100,
                                height: 100,
                            }}
                            source={require("@/assets/images/animations/loader2.json")}
                            autoPlay
                            loop
                        />
                    )}
                </View>
            )}
            onEndReached={() => {
                if (hasNextPage) fetchNextPage();
            }}
            onEndReachedThreshold={5}
            onRefresh={() => {
                refetch();
            }}
            showsVerticalScrollIndicator={false}
        ></FlatList>
    );
};

export default FriendRequestList;
