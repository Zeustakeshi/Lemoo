import ChatHeader from "@/components/header/ChatHeader";
import ChatInput from "@/modules/chat/ChatInput";
import MessageList from "@/modules/chat/message/MessageList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/rooms/$roomId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="w-full grid grid-rows-[auto,1fr,auto] h-screen">
            <ChatHeader></ChatHeader>
            <MessageList></MessageList>
            <ChatInput></ChatInput>
        </div>
    );
}
