import { UserContact } from "@/common/type/contact.type";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getContactSuggestions = async (
    page: number,
    limit?: number
): Promise<Pageable<UserContact>> => {
    return await api.get("/users/friends/recommend", {
        params: { page, limit: limit || 10 },
    });
};

export const sendContactRequest = async (target: string) => {
    return await api.post("/users/friends/request", {
        target,
    });
};
