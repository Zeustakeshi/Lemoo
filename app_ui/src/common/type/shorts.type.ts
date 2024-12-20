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
    };
    products: {
        id: string;
        name: string;
        image: string;
        price: number;
    };
    tags: string[];
};
