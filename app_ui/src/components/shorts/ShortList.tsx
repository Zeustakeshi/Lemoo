import React from "react";
import { FlatList, Text, View } from "react-native";
import ShortItem from "./ShortItem";

type Props = {};

const ShortList = (props: Props) => {
    return (
        <View className="my-4">
            <Text className="text-2xl my-3 mx-4 font-semibold">Shorts</Text>
            <FlatList
                data={new Array(5).fill(0)}
                renderItem={() => <ShortItem></ShortItem>}
                keyExtractor={(_, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                horizontal
            ></FlatList>
        </View>
    );
};

export default ShortList;
