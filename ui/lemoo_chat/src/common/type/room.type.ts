export type ChatRoomType = {
    id: string;
    avatar: string;
    isSA: boolean;
    name: string;
    type: "SINGLE" | "GROUP";
};

export type ChatRoomDetailType = {
    avatar: string;
    id: string;
    isSA: boolean;
    name: string;
    totalMembers: number;
    type: "SINGLE" | "GROUP";
};
