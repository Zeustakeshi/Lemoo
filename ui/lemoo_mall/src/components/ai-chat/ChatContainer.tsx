import { RootState } from "@/store/store";

import { useSelector } from "react-redux";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
};

const ChatContainer = ({}: Props) => {
    const { messages } = useSelector((state: RootState) => state.chatAi);

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
