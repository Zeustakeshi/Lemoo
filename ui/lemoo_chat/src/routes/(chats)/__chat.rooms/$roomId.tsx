import { getChatRoomInfo } from "@/api/chat.api";
import ChatHeader from "@/components/header/ChatHeader";
import ChatInput from "@/modules/chat/ChatInput";
import MessageList from "@/modules/chat/message/MessageList";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/rooms/$roomId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { roomId } = Route.useParams();

    const { data } = useQuery({
        queryKey: ["room-detail", roomId],
        queryFn: async () => await getChatRoomInfo(roomId),
    });

    if (!data) return <>nothing here</>;

    return (
        <div className="w-full grid grid-rows-[auto,1fr,auto] h-screen">
            <ChatHeader room={data}></ChatHeader>
            <MessageList></MessageList>
            <ChatInput></ChatInput>
        </div>
    );
}
