import FriendRecommendList from "@/modules/friend/recommend/FriendRecommendList";
import React from "react";
import { View } from "react-native";

type Props = {};

const recommend = (props: Props) => {
    return (
        <View>
            <FriendRecommendList></FriendRecommendList>
        </View>
    );
};

export default recommend;
