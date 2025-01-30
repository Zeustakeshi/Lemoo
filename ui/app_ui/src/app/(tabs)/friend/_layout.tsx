import HeaderProfile from "@/components/header/HeaderProfile";
import AppWrapper from "@/components/wrapper/AppWrapper";
import FriendTabs from "@/modules/friend/tab/FriendTabs";
import { Slot } from "expo-router";
import React from "react";
import { View } from "react-native";

type Props = {};

const FriendLayout = (props: Props) => {
    return (
        <AppWrapper>
            <HeaderProfile></HeaderProfile>
            <FriendTabs></FriendTabs>
            <View className="p-2">
                <Slot></Slot>
            </View>
        </AppWrapper>
    );
};

export default FriendLayout;
