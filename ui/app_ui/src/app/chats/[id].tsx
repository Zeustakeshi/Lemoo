import AppWrapper from "@/components/wrapper/AppWrapper";
import ChatHeader from "@/modules/chat/ChatHeader";
import InputMessage from "@/modules/chat/InputMessage";
import MessageList from "@/modules/chat/MessageList";
import React from "react";

type Props = {};

const ChatPage = (props: Props) => {
    return (
        <AppWrapper className="">
            <ChatHeader></ChatHeader>
            <MessageList></MessageList>
            <InputMessage></InputMessage>
        </AppWrapper>
    );
};

export default ChatPage;
