import { ChatMessageType } from "@/common/type/chat.ai.type";
import { api } from "@/lib/api";

export const askAi = async (message: string): Promise<string> => {
    return api.post("/ai/chat/ask", {
        message,
    });
};

export const getChatMessages = async (): Promise<ChatMessageType[]> => {
    return await api.get("/ai/chat/messages");
};
