import FriendConfirmedList from "@/components/friend/confirmed/FriendConfirmedList";
import React from "react";
import { View } from "react-native";

type Props = {};

const comfirmed = (props: Props) => {
    return (
        <View>
            <FriendConfirmedList></FriendConfirmedList>
        </View>
    );
};

export default comfirmed;
