import { FriendRecommend } from "@/common/type/friend";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getRecommendFriend = async (
    page: number
): Promise<Pageable<FriendRecommend>> => {
    return await api.get("/users/friends/recommend", {
        params: { page: page, limit: 10 },
    });
};

export const addFriend = async (userId: string) => {
    return await api.post("/users/friends/request", {
        target: userId,
    });
};
