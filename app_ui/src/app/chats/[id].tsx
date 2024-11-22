import ChatHeader from "@/components/chat/ChatHeader";
import InputMessage from "@/components/chat/InputMessage";
import MessageList from "@/components/chat/MessageList";
import AppWrapper from "@/components/wrapper/AppWrapper";
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
