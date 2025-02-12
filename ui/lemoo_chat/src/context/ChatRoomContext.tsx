import { ChatRoomDetailType } from "@/common/type/room.type";
import { createContext, useContext } from "react";

export interface ChatRoomContext {
    room: ChatRoomDetailType;
}

const ChatRoomContext = createContext<ChatRoomContext | null>(null);

export function ChatRoomProvider({
    children,
    room,
}: {
    children: React.ReactNode;
    room: ChatRoomDetailType;
}) {
    return (
        <ChatRoomContext.Provider value={{ room }}>
            {children}
        </ChatRoomContext.Provider>
    );
}

export function useChatRoom() {
    const context = useContext(ChatRoomContext);
    if (!context) {
        throw new Error("useChatRoom must be used within a ChatRoomProvider");
    }
    return context;
}
