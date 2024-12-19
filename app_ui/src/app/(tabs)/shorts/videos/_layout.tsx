import ShortVideoHeader from "@/components/shorts/ShortVideoHeader";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const _layout = (props: Props) => {
    return (
        <View className="flex-1 bg-yellow-500">
            <ShortVideoHeader></ShortVideoHeader>
            <Slot></Slot>
        </View>
    );
};

export default _layout;
