import React from "react";
import { FlatList } from "react-native";
import ChatMessage from "./ChatMessage";

type Props = {};

const MessageList = (props: Props) => {
    return (
        <FlatList
            data={new Array(10).fill(0)}
            renderItem={() => <ChatMessage />}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={false}
        ></FlatList>
    );
};

export default MessageList;
