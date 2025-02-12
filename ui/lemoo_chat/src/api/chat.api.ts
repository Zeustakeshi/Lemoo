import { Pageable } from "@/common/type/page.type";
import { ChatRoomDetailType, ChatRoomType } from "@/common/type/room.type";
import { api } from "@/lib/api";

export const getAllChatRoom = async (
    page: number,
    limit?: number
): Promise<Pageable<ChatRoomType>> => {
    return await api.get("/chats/rooms", {
        params: { page, limit: limit ?? 10 },
    });
};

export const getChatRoomInfo = async (
    roomId: string
): Promise<ChatRoomDetailType> => {
    return api.get(`/chats/rooms/${roomId}`);
};
