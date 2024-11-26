import React from "react";
import { Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
type Props = {};

const CommentList = (props: Props) => {
    return (
        <View className="px-4">
            <Text className="text-2xl font-semibold">Bình luận</Text>
            <View className="w-full h-[1] bg-slate-200 my-5"></View>
            <FlatList
                className="max-h-[82%]"
                data={new Array(10).fill(0)}
                renderItem={() => <CommentItem></CommentItem>}
                keyExtractor={(_, index) => index.toString()}
                showsVerticalScrollIndicator={false}
            ></FlatList>
            <CommentInput></CommentInput>
        </View>
    );
};

export default CommentList;
