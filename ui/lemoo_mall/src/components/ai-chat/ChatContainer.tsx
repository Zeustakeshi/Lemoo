import { RootState } from "@/store/store";

import { getChatMessages } from "@/api/ai.chat.api";
import { addChatMessageRange } from "@/store/chat_ai/chatAiSlice";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ChatContainer = ({}: Props) => {
    const { messages } = useSelector((state: RootState) => state.chatAi);

    const { data } = useQuery({
        queryKey: ["get-ai-chat-messages"],
        queryFn: getChatMessages,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!data) return;
        dispatch(addChatMessageRange(data));
    }, [data]);
    return (
        <div className="p-3 flex flex-col absolute h-[600px] w-[500px] bg-white shadow-2xl bottom-0 right-0 rounded-xl">
            <ChatHeader></ChatHeader>
            <div className="flex-1 max-h-[540px] overflow-y-auto custom-scroll p-1">
                {messages.map((message, index) => (
                    <ChatMessage key={index} message={message}></ChatMessage>
                ))}
            </div>
            <ChatInput></ChatInput>
        </div>
    );
};

export default ChatContainer;
