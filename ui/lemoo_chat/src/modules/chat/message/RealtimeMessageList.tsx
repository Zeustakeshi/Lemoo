import { MessageType } from "@/common/type/message.type";
import { useAuth } from "@/context/AuthContext";
import { useChatRoom } from "@/context/ChatRoomContext";
import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import Message from "./Message";

type Props = {};

const RealtimeMessageList = ({}: Props) => {
    const [realtimeMessages, setRealtimeMessages] = useState<MessageType[]>([]);
    const { user } = useAuth();
    const { room } = useChatRoom();
    const { client } = useSocket();

    useEffect(() => {
        setRealtimeMessages([]);
    }, [room.id]);

    useEffect(() => {
        if (!client) return;
        const subscription = client.subscribe(
            `/topic/chats/${room.id}/messages`,
            (message) => {
                const newMessage = JSON.parse(message.body);
                setRealtimeMessages((messages) => [
                    ...messages,
                    {
                        id: newMessage.messageId,
                        isSelf: newMessage.sender.id === user?.id,
                        text: newMessage.message,
                        sender: newMessage.sender,
                        timestamp: newMessage.timestamp,
                        viewers: [],
                    },
                ]);
            }
        );
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [client, room.id]);

    return realtimeMessages.map((message, index) => (
        <Message
            key={index}
            message={message}
            isLatest={index === realtimeMessages.length - 1}
        ></Message>
    ));
};

export default RealtimeMessageList;
