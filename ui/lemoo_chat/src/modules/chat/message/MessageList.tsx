import { useSocket } from "@/context/SocketContext";
import { useEffect, useState } from "react";
import Message from "./Message";

type Props = {};

const MessageList = (props: Props) => {
    const { client, isConnected } = useSocket();

    const [messages, setMessages] = useState<{ id: string; content: string }[]>(
        []
    );

    useEffect(() => {
        if (!client) return;
        const subscription = client.subscribe(
            "/topic/receive-message",
            (message) => {
                const newMessage = JSON.parse(message.body);
                console.log(
                    "====================== set message =================="
                );
                setMessages((messages) => [...messages, newMessage.content]);
            }
        );
        return () => {
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [client]);

    console.log({ messages });
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
