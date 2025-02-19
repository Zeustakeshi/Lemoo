import { MessageType } from "@/common/type/message.type";
import { createContext, useContext } from "react";

export interface MessageContext {
    message: MessageType;
    isLatest: boolean;
}

const MessageContext = createContext<MessageContext | null>(null);

export function MessageProvider({
    children,
    message,
    isLatest,
}: {
    children: React.ReactNode;
    message: MessageType;
    isLatest: boolean;
}) {
    return (
        <MessageContext.Provider value={{ message, isLatest }}>
            {children}
        </MessageContext.Provider>
    );
}

export function useMessage() {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error("useMessage must be used within a MessageProvider");
    }
    return context;
}
