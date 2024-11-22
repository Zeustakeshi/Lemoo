import React from "react";
import { FlatList } from "react-native";
import ChatItem from "./ChatItem";

type Props = {};

const ChatList = (props: Props) => {
    return (
        <FlatList
            className="mb-[140]"
            data={new Array(20).fill(0)}
            renderItem={() => <ChatItem></ChatItem>}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        />
    );
};

export default ChatList;
