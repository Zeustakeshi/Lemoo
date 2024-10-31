import React from "react";
import { View } from "react-native";
import FriendTabItem from "./FriendTabItem";

type Props = {};

const FriendTabs = (props: Props) => {
    return (
        <View className="my-2 flex-row gap-2 justify-between items-center">
            <FriendTabItem to="/recommend" label="Đề xuất" />
            <FriendTabItem to="/request" label="Lời mời" />
            <FriendTabItem to="/comfirmed" label="Bạn của tôi" />
        </View>
    );
};

export default FriendTabs;
