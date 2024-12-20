import ShortVideoHeader from "@/components/shorts/video/ShortVideoHeader";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const _layout = (props: Props) => {
    return (
        <View className="flex-1 bg-black">
            <ShortVideoHeader></ShortVideoHeader>
            <Slot initialRouteName="trending"></Slot>
        </View>
    );
};

export default _layout;
