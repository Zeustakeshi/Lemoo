import { MessageStatus as Status } from "@/common/enum/message.enum";
import { useChatRoom } from "@/context/ChatRoomContext";
import { useMessage } from "@/context/MessageContext";
import { useSocket } from "@/context/SocketContext";
import { messageStatusMapper } from "@/lib/message";
import { useEffect, useState } from "react";

type Props = {};

const MessageStatus = (props: Props) => {
    const [status, setStatus] = useState<Status>(Status.SENT);

    const { room } = useChatRoom();
    const { client } = useSocket();
    const { message } = useMessage();

    useEffect(() => {
        if (!client) return;
        const subscription = client.subscribe(
            `/topic/chats/${room.id}/messages/${message.id}/status`,
            (message) => {
                const event = JSON.parse(message.body);
                setStatus(Status[event.status as keyof typeof Status]);
            }
        );
        return () => {
            if (subscription) {
                console.log("unsub message status messId: " + message.id);
                subscription.unsubscribe();
            }
        };
    }, [client, room.id]);

    return (
        <div className="float-end mx-2 px-2 py-1 text-xs mt-1 select-none transition-all rounded-md bg-slate-400 text-white">
            {messageStatusMapper(status)}
        </div>
    );
};

export default MessageStatus;
