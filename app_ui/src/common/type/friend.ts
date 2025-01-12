export type FriendResponse = {
    id: string;
    avatar: string;
    username: string;
};

export type FriendRecommend = {
    displayName: string;
} & FriendResponse;

export type FriendInvitation = {
    timestamp: string;
    requestId: string;
} & FriendResponse;
