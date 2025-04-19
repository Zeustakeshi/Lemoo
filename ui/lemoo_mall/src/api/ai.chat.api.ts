import axios from "axios";

export const askAi = async (message: string) => {
    return axios.get("http://localhost:8002/ai/chat", {
        params: { message },
    });
};
