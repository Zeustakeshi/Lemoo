import { useSocket } from "@/context/SocketContext";
import { useParams } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Message from "./Message";

type Props = {};

const MessageList = (props: Props) => {
    const { roomId } = useParams({ strict: false });
    const { client, isConnected } = useSocket();

    const [messages, setMessages] = useState<{ id: string; content: string }[]>(
        []
    );

    const ackMessage = (messageId: string) => {
        client?.publish({
            destination: `/chats/${roomId}/messages/${messageId}/ack`,
        });
        console.log("ack message");
    };

    useEffect(() => {
        if (!client) return;
        const subscription = client.subscribe(
            `/topic/chats/${roomId}/messages`,
            (message) => {
                const newMessage = JSON.parse(message.body);
                console.log({ newMessage });

                // ackMessage(newMessage.messageId);
                // setMessages((messages) => [...messages, newMessage.content]);
            }
        );
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [client]);

    useEffect(() => {
        if (!client) return;
        const subscription = client.subscribe(
            `/topic/chats/${roomId}/messages/status`,
            (message) => {
                const status = JSON.parse(message.body);
                console.log({ status });
                // setMessages((messages) => [...messages, newMessage.content]);
            }
        );
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [client]);

    return (
        <div className=" w-full h-full overflow-y-scroll overflow-x-hidden custom-scroll px-5 py-2">
            {messages.map((_, index) => (
                <Message
                    key={index}
                    // isSelf={Math.floor(Math.random() * 2) === 1}
                    isSelf
                ></Message>
            ))}
        </div>
    );
};

export default MessageList;
