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
                "justify-start": message.actor === "ai",
                "justify-end  ": message.actor === "user",
            })}
        >
            <div
                className={cn("px-2 py-1 rounded-md mb-2 w-max", {
                    "bg-slate-100": message.actor === "ai",
                    "bg-primary text-white ": message.actor === "user",
                })}
            >
                <ReactMarkdown>{message.message}</ReactMarkdown>
            </div>
        </div>
    );
};

export default ChatMessage;
