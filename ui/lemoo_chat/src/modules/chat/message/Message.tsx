import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import MessageContent from "./MessageContent";
import MessageStatus from "./MessageStatus";

type Props = {
    isSelf?: boolean;
};

const Message = ({ isSelf = false }: Props) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div
            ref={messagesEndRef}
            className={cn("my-5 flex justify-start items-start gap-2", {
                "justify-end": isSelf,
            })}
        >
            {!isSelf && (
                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/150?img=31"></AvatarImage>
                </Avatar>
            )}
            <div className="max-w-[60%]">
                <MessageContent isSelf={isSelf}></MessageContent>
                {isSelf && <MessageStatus></MessageStatus>}
            </div>
        </div>
    );
};

export default Message;
