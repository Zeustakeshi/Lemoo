import ShortVideo from "@/components/shorts/ShortVideo";
import React from "react";
import { Dimensions, FlatList } from "react-native";

type Props = {};
const { height } = Dimensions.get("window");

const index = (props: Props) => {
    return (
        <FlatList
            data={new Array(3).fill(0)}
            renderItem={() => <ShortVideo />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            decelerationRate="fast"
            snapToInterval={height}
            pagingEnabled={true}
            snapToAlignment="start"
        ></FlatList>
    );
};

export default index;
