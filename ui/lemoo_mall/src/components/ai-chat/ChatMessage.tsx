import { MessageType } from "@/common/enum/chat.ai.enum";
import { ChatMessageType } from "@/common/type/chat.ai.type";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

type Props = {
    message: ChatMessageType;
};

const ChatMessage = ({ message }: Props) => {
    const messageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messageRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, []);

    return (
        <div
            ref={messageRef}
            className={cn("flex", {
                "justify-start": message.type === MessageType.ASSISTANT,
                "justify-end  ": message.type === MessageType.USER,
            })}
        >
            <div
                className={cn("px-2 py-1 rounded-md mb-2 w-max", {
                    "bg-slate-100": message.type === MessageType.ASSISTANT,
                    "bg-primary text-white ": message.type === MessageType.USER,
                })}
            >
                <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatMessage;
