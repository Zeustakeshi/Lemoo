import HeaderProfile from "@/components/header/HeaderProfile";
import AppWrapper from "@/components/wrapper/AppWrapper";
import ChatList from "@/modules/chat/ChatList";
import FriendOnlineList from "@/modules/chat/FriendOnlineList";
import React from "react";
import { View } from "react-native";

type Props = {};

const chats = (props: Props) => {
    return (
        <AppWrapper className="h-full flex-1">
            <HeaderProfile></HeaderProfile>
            <View className="p-2">
                <FriendOnlineList></FriendOnlineList>
                <ChatList></ChatList>
            </View>
        </AppWrapper>
    );
};

export default chats;
