import { api } from "@/lib/api";

export const askAi = async (message: string): Promise<string> => {
    return api.post("/ai/chat/ask", {
        message,
    });
};
