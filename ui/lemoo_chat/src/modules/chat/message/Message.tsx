import { MessageType } from "@/common/type/message.type";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { useChatRoom } from "@/context/ChatRoomContext";
import { MessageProvider } from "@/context/MessageContext";
import { useSocket } from "@/context/SocketContext";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useRef } from "react";
import MessageContent from "./MessageContent";
import MessageStatus from "./MessageStatus";

type Props = {
    message: MessageType;
    isLatest?: boolean;
};

const Message = ({ message, isLatest = false }: Props, ref: any) => {
    const { client } = useSocket();
    const { room } = useChatRoom();
    const { user } = useAuth();

    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!message.isSelf && user && !message.viewers.includes(user.id)) {
            console.log("ack message " + message.id);
            ackMessage();
        }
    }, [room.id, user]);

    useEffect(() => {
        if (!isLatest) return;
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }, [isLatest, room.id]);

    const ackMessage = () => {
        client?.publish({
            destination: `/chats/${room.id}/messages/${message.id}/ack`,
        });
        console.log("ack message");
    };

    return (
        <MessageProvider message={message} isLatest={isLatest}>
            <div className="inview-flag" ref={ref}></div>
            <div
                ref={messagesEndRef}
                className={cn("my-5 flex justify-start items-start gap-2", {
                    "justify-end": message.isSelf,
                })}
            >
                {!message.isSelf && (
                    <Avatar>
                        <AvatarImage src={message.sender?.avatar}></AvatarImage>
                    </Avatar>
                )}
                <div className="max-w-[60%]">
                    <MessageContent></MessageContent>
                    {message.isSelf && isLatest && (
                        <MessageStatus></MessageStatus>
                    )}
                </div>
            </div>
        </MessageProvider>
    );
};

export default forwardRef(Message);
