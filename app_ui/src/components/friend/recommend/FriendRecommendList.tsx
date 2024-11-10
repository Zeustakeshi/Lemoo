import React from "react";
import { FlatList, Text, View } from "react-native";
import FriendRecommendCard from "./FriendRecommendCard";

type Props = {};

const FriendRecommendList = (props: Props) => {
    return (
        <FlatList
            className=""
            initialNumToRender={10}
            renderItem={({ item }) => <FriendRecommendCard />}
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            showsVerticalScrollIndicator={false}
            onEndReached={async () => {
                console.log("end");
            }}
            keyExtractor={(_, index) => index.toString()}
            ListEmptyComponent={() => {
                // if (loading) return null;
                return (
                    <View className="flex-1 justify-center items-center min-h-[150px]">
                        <Text className="text-sm text-slate-800">
                            Bạn chưa có học phần nào
                        </Text>
                    </View>
                );
            }}
            ListFooterComponent={() => <View className="h-[100px] "></View>}
        ></FlatList>
    );
};

export default FriendRecommendList;
