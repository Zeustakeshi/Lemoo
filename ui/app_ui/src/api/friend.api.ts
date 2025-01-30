import {
    FriendInvitation,
    FriendRecommend,
    FriendResponse,
} from "@/common/type/friend";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getRecommendFriend = async (
    page: number
): Promise<Pageable<FriendRecommend>> => {
    return await api.get("/users/friends/recommend", {
        params: { page, limit: 10 },
    });
};

export const getFriendInvitations = async (
    page: number
): Promise<Pageable<FriendInvitation>> => {
    return api.get("/users/friends/request", { params: { page, limit: 10 } });
};

export const getAllFriends = async (
    page: number
): Promise<Pageable<FriendResponse>> => {
    return await api.get("/users/friends", { params: { page, limit: 10 } });
};

export const addFriend = async (userId: string) => {
    return await api.post("/users/friends/request", {
        target: userId,
    });
};

export const acceptFriend = async (requestId: string) => {
    return await api.post("/users/friends/accept", { requestId });
};

export const rejectFriend = async (requestId: string) => {
    return await api.delete("/users/friends/reject", { data: { requestId } });
};
