import { ContactRequest, UserContact } from "@/common/type/contact.type";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getContactSuggestions = async (
    page: number,
    limit?: number
): Promise<Pageable<UserContact>> => {
    return await api.get("/users/friends/recommend", {
        params: { page, limit: limit ?? 10 },
    });
};

export const getContactRequests = async (
    page: number,
    limit?: number
): Promise<Pageable<ContactRequest>> => {
    return await api.get("/users/friends/request", {
        params: {
            page,
            limit: limit ?? 10,
        },
    });
};

export const getAllContact = async (
    page: number,
    limit?: number
): Promise<Pageable<UserContact>> => {
    return await api.get("/users/friends", {
        params: {
            page,
            limit: limit ?? 10,
        },
    });
};

export const sendContactRequest = async (target: string) => {
    return await api.post("/users/friends/request", {
        target,
    });
};

export const acceptContactRequest = async (requestId: string) => {
    console.log({ requestId });
    return await api.post("/users/friends/accept", {
        senderId: requestId,
    });
};

export const rejectContactRequest = async (requestId: string) => {
    return await api.delete("/users/friends/reject", {
        data: {
            senderId: requestId,
        },
    });
};
