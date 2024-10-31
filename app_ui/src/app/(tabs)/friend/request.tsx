import FriendRequestList from "@/components/friend/request/FriendRequestList";
import React from "react";
import { View } from "react-native";

type Props = {};

const request = (props: Props) => {
    return (
        <View>
            <FriendRequestList></FriendRequestList>
        </View>
    );
};

export default request;
