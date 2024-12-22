export type ChannelResponse = {
    id: string;
    name: string;
    avatar: string;
    background: string;
    follower: number;
    following: number;
    isFollowed: boolean;
};

export type VideoShortResponse = {
    id: string;
    name: string;
    description: string;
    url: string;
    views: number;
    channel: {
        id: string;
        avatar: string;
        name: string;
        isFollowed: boolean;
    };
    products: {
        id: string;
        name: string;
        image: string;
        price: number;
    };
    tags: string[];
};

export type CommentResponse = {
    id: string;
    user: {
        id: string;
        name: string;
        avatar: string;
    };
    content: string;
    createdAt: string;
    updatedAt: string;
    isEdited: boolean;
    replyCount: number;
    reaction: {
        like: number;
        dislike: number;
        isDisliked: boolean;
        isLiked: boolean;
    };
};

export type ChannelVideoResponse = {
    id: string;
    url: string;
    views: number;
    status: "BLOCK" | "PRIVATE" | "PUBLIC";
    createdAt: string;
    updatedAt: string;
};
